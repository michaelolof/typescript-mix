"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mix(client, mixins) {
    const clientKeys = Object.getOwnPropertyNames(client.prototype);
    for (let mixin of mixins) {
        const mixinMixables = getMixables(clientKeys, mixin);
        Object.defineProperties(client.prototype, mixinMixables);
    }
}
/**
 * Returns a map of mixables. That is things that can be mixed in
 */
function getMixables(clientKeys, mixin) {
    let descriptors = {};
    switch (typeof mixin) {
        case "object":
            descriptors = getMixables(mixin);
            break;
        case "function":
            descriptors = getMixables(mixin.prototype);
            break;
    }
    return descriptors;
    function getMixables(obj) {
        const map = {};
        Object.getOwnPropertyNames(obj).map(key => {
            if (clientKeys.indexOf(key) < 0) {
                const descriptor = Object.getOwnPropertyDescriptor(obj, key);
                if (descriptor.get) {
                    map[key] = descriptor;
                }
                else if (typeof descriptor.value === "function") {
                    map[key] = descriptor;
                }
            }
        });
        return map;
    }
}
/**
 * Takes a list of classes or object literals and adds their methods
 * to the class calling it.
 */
function use(...options) {
    return function (target, propertyKey) {
        mix(target.constructor, options.reverse());
    };
}
exports.use = use;
/**
 * Takes a method as a parameter and add it to the class calling it.
 */
function delegate(method) {
    return function (target, propertyKey) {
        target.constructor.prototype[propertyKey] = method;
    };
}
exports.delegate = delegate;
//# sourceMappingURL=index.js.map