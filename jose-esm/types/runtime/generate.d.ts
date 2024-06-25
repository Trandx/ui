import type { GenerateKeyPairOptions } from '../key/generate_key_pair.js';
import type { GenerateSecretOptions } from '../key/generate_secret.js';
export declare function generateSecret(alg: string, options?: GenerateSecretOptions): Promise<any>;
export declare function generateKeyPair(alg: string, options?: GenerateKeyPairOptions): Promise<any>;
