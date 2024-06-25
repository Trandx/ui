import type { KeyObject, SignKeyObjectInput } from 'node:crypto';
export default function keyForCrypto(alg: string, key: KeyObject): KeyObject | SignKeyObjectInput;
