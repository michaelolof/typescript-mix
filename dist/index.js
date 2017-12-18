"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mix(baseClass, mixins) {
    const baseClassNames = getClassMethodsWithoutConstructor(baseClass);
    for (let mixin of mixins) {
        const methodNames = getMethodNames(mixin);
        methodNames.forEach(methodName => {
            if (baseClassNames.indexOf(methodName) > -1)
                return;
            if (typeof mixin === "object") {
                baseClass.prototype[methodName] = mixin[methodName];
            }
            else {
                baseClass.prototype[methodName] = mixin.prototype[methodName];
            }
        });
    }
}
function getMethodNames(mixin) {
    let methodNames = [];
    switch (typeof mixin) {
        case "object":
            methodNames = getObjectMethods(mixin);
            break;
        case "function":
            methodNames = getClassMethodsWithoutConstructor(mixin);
            break;
    }
    return methodNames;
}
function getObjectMethods(obj) {
    return Object.getOwnPropertyNames(obj).filter(key => {
        return obj[key] && (typeof obj[key] === "function");
    });
}
function getClassMethodsWithoutConstructor(cls) {
    const baseClassMethodNames = Object.getOwnPropertyNames(cls.prototype);
    return baseClassMethodNames.slice(1, baseClassMethodNames.length); // Don't mess with the constructor.  
}
function use(...options) {
    return function (target, propertyKey) {
        mix(target.constructor, options);
    };
}
exports.default = use;
//# sourceMappingURL=index.js.map