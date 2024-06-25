import { KeyObject } from 'node:crypto';
export declare const weakMap: WeakMap<KeyObject, string>;
declare const getNamedCurve: (kee: unknown, raw?: boolean) => string;
export default getNamedCurve;
