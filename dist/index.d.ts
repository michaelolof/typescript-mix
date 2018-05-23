export declare type Constructor<T> = new (...args: any[]) => T;
export declare type Mixin<T> = Constructor<T> | object;
export default function use(...options: Mixin<any>[]): (target: any, propertyKey: string) => void;
export declare function delegate(method: (...args: any[]) => any): (target: any, propertyKey: string) => void;
