export type Constructor<T> = new (...args: any[]) => T;
export type Mixin<T> = Constructor<T> | object;

function mix( baseClass: Constructor<any>, mixins: Mixin<any>[] ) {
  const baseClassNames = getClassMethodsWithoutConstructor( baseClass );
  for( let mixin of mixins ) {
    const methodNames = getMethodNames( mixin );
    methodNames.forEach( methodName => {
      if( baseClassNames.indexOf( methodName ) > - 1 ) return
      if( typeof mixin === "object" ) {
        baseClass.prototype[ methodName ] = mixin[ methodName ];
      } else { 
        baseClass.prototype[ methodName ] = mixin.prototype[ methodName ];
      }
    });
  }
}

function getMethodNames(mixin: Mixin<any> ) {
  let methodNames:string[] = [];
  switch( typeof mixin ) {
    case "object":
      methodNames = getObjectMethods( mixin );
      break;
    case "function":
      methodNames = getClassMethodsWithoutConstructor( mixin as Constructor<any> );
      break;
  }
  return methodNames;
}

function getObjectMethods(obj:object): string[] {
  return Object.getOwnPropertyNames( obj ).filter( key => {
    return obj[key] && (typeof obj[key] === "function");
  })
}

function getClassMethodsWithoutConstructor(cls:Constructor<any>): string[] {
  const baseClassMethodNames: string[] = Object.getOwnPropertyNames( cls.prototype )
  return baseClassMethodNames.slice( 1, baseClassMethodNames.length ); // Don't mess with the constructor.  
}

export default function use(...options:Mixin<any>[] ) {
  return function ( target:any, propertyKey:string ) {
    mix( target.constructor, options );
  }
}

export function delegate( method:(...args:any[])=>any ) {
  return function(target:any, propertyKey:string) {
    target.constructor.prototype[ propertyKey ] = method;
  }
}