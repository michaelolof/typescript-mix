export type Constructor<T> = new (...args: any[]) => T;


function mix( baseClass: Constructor<any>, mixinClasses: Constructor<any>[], deepMix?:boolean) {
  if( deepMix == undefined ) deepMix = false;
 
  // We don't want to override the constructor
  // We also don't want to override methods or properties that are explicitly defined in the derived constructor.
  mixinClasses.forEach( mixinClass => {
    const basePropertyNames: string[] = Object.getOwnPropertyNames( baseClass.prototype )
    const basePropertyMinusConstructor = basePropertyNames.slice( 1, basePropertyNames.length ); // Don't mess with the constructor.
    
    
    // By default mixins shouldn't have a constructor but since a TypeScript mixin is just a class
    // a default constructor is created for you. So we remove that.
    const mixinPropertyNames = Object.getOwnPropertyNames( mixinClass.prototype );
    const mixinPropertyMinusConstructor = mixinPropertyNames.slice( 1, mixinPropertyNames.length );

    const keys = Object.keys( mixinClass.prototype );

    const mixinClassObject = Object.create( baseClass.prototype );


    mixinPropertyMinusConstructor.forEach( baseName => {
      if( deepMix ) {
        // const deepMixSymbol = `${mixinClass.name}.${baseName}`;
        // baseClass.prototype[ deepMixSymbol ] = mixinClass.prototype[ baseName ];
        baseClass.prototype[ mixinClass.name ] = mixinClassObject;
        console.log( mixinClass.name )      
      }
      if( basePropertyMinusConstructor.indexOf( baseName ) > - 1 ) return
      baseClass.prototype[ baseName ] = mixinClass.prototype[ baseName ];
    })

  });
}

// Decorators
export default function use(...options:Constructor<{}>[] ) {
  return function ( target:any, propertyKey:string ) {
    mix( target.constructor, options, true );
  }
}