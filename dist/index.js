"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mix(baseClass, mixinObjects) {
    // We don't want to override methods or properties that are explicitly defined in the base classes.
    const baseClassMethodNames = Object.getOwnPropertyNames(baseClass.prototype);
    const baseClassMethodsMinusConstructor = baseClassMethodNames.slice(1, baseClassMethodNames.length); // Don't mess with the constructor.
    const baseClassPropertyNames = Object.getOwnPropertyNames(new baseClass());
    const baseClassNames = [...baseClassPropertyNames, ...baseClassMethodsMinusConstructor];
    const mergedMixinObject = Object.assign({}, ...mixinObjects);
    for (let mixinProp in mergedMixinObject) {
        if (baseClassMethodsMinusConstructor.indexOf(mixinProp) > -1)
            return;
        const mixinValue = mergedMixinObject[mixinProp];
        if (!(typeof mixinValue === "string" || typeof mixinValue === "number" ||
            typeof mixinValue === "function" || typeof mixinValue === "undefined")) {
            throw new Error("Defined mixin properties must be either 'string', 'number', 'function', or 'undefined'.\nAvoid declaring mixin properties of complex types like 'objects', 'classes' or 'null'.\nThis ability should be left to the concrete class utilizing the mixin.");
        }
        baseClass.prototype[mixinProp] = mixinValue;
    }
}
function use(...options) {
    return function (target, propertyKey) {
        mix(target.constructor, options);
    };
}
exports.default = use;
//# sourceMappingURL=index.js.map