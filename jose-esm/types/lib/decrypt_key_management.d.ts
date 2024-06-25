import type { DecryptOptions, JWEHeaderParameters, KeyLike } from '../types.d';
declare function decryptKeyManagement(alg: string, key: KeyLike | Uint8Array, encryptedKey: Uint8Array | undefined, joseHeader: JWEHeaderParameters, options?: DecryptOptions): Promise<KeyLike | Uint8Array>;
export default decryptKeyManagement;
