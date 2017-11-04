export type Constructor<T> = new (...args: any[]) => T;

function mix( baseClass: Constructor<any>, mixinObjects: object[] ) {
  // We don't want to override methods or properties that are explicitly defined in the base classes.
  const baseClassMethodNames: string[] = Object.getOwnPropertyNames( baseClass.prototype )
  const baseClassMethodsMinusConstructor = baseClassMethodNames.slice( 1, baseClassMethodNames.length ); // Don't mess with the constructor.
  const baseClassPropertyNames: string[] = Object.getOwnPropertyNames( new baseClass() )
  const baseClassNames = [...baseClassPropertyNames, ...baseClassMethodsMinusConstructor ];
  const mergedMixinObject:object = Object.assign( {}, ...mixinObjects );
  
  for(let mixinProp in mergedMixinObject ) {
    if( baseClassMethodsMinusConstructor.indexOf( mixinProp ) > - 1 ) return
    const mixinValue = mergedMixinObject[mixinProp];
    if( !( typeof mixinValue === "string" || typeof mixinValue === "number" || 
           typeof mixinValue === "function" || typeof mixinValue === "undefined" )) {
      throw new Error("Defined mixin properties must be either 'string', 'number', 'function', or 'undefined'.\nAvoid declaring mixin properties of complex types like 'objects', 'classes' or 'null'.\nThis ability should be left to the concrete class utilizing the mixin.")
    }
    baseClass.prototype[ mixinProp ] = mixinValue;
  }
}

export default function use(...options:object[] ) {
  return function ( target:any, propertyKey:string ) {
    mix( target.constructor, options );
  }
}