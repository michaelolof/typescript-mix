export declare type Constructor<T> = new (...args: any[]) => T;
export declare type Mixin<T> = Constructor<T> | object;
export default function use(...options: Mixin<any>[]): (target: any, propertyKey: string) => void;
