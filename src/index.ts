export type Constructor<T> = new (...args: any[]) => T;
export type Mixin<T> = Constructor<T> | object;

function mix(client: Constructor<any>, mixins: Mixin<any>[]) {
  const clientKeys = Object.getOwnPropertyNames( client.prototype );
  for (let mixin of mixins) {
    const mixinMixables = getMixables(clientKeys, mixin);
    Object.defineProperties( client.prototype, mixinMixables );
  }
}

/**
 * Returns a map of mixables. That is things that can be mixed in
 */
function getMixables(clientKeys:string[], mixin: Mixin<any>) {
  let descriptors:PropertyDescriptorMap = {};
  switch (typeof mixin) {
    case "object":
      descriptors = getMixables(mixin);
      break;
    case "function":
      descriptors = getMixables((mixin as Constructor<any>).prototype);
      break;
  }
  return descriptors;

  function getMixables(obj:object):PropertyDescriptorMap {
    const map:PropertyDescriptorMap = {};
    Object.getOwnPropertyNames( obj ).map( key => {
      if( clientKeys.indexOf( key ) < 0 ) {
        const descriptor = Object.getOwnPropertyDescriptor( obj, key );
        if( descriptor.get ) {
          map[ key ] = descriptor;
        }
        else 
        if ( typeof descriptor.value === "function" ) {
          map[ key ] = descriptor;
        }
      }
    })
    return map;
  }
  
}

/**
 * Takes a list of classes or object literals and adds their methods
 * to the class calling it.
 */
export function use(...options: Mixin<any>[]) {
  return function (target: any, propertyKey: string) {
    mix(target.constructor, options.reverse());
  }
}

/**
 * Takes a method as a parameter and add it to the class calling it. 
 */
export function delegate(method: (...args: any[]) => any) {
  return function (target: any, propertyKey: string) {
    target.constructor.prototype[propertyKey] = method;
  }
}