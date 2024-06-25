import type { JWK, KeyLike } from '../types.d';
export interface PEMImportOptions {
    /**
     * (Only effective in Web Crypto API runtimes) The value to use as
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey SubtleCrypto.importKey()}
     * `extractable` argument. Default is false.
     */
    extractable?: boolean;
}
/**
 * Imports a PEM-encoded SPKI string as a runtime-specific public key representation (KeyObject or
 * CryptoKey).
 *
 * Note: The OID id-RSASSA-PSS (1.2.840.113549.1.1.10) is not supported in
 * {@link https://w3c.github.io/webcrypto/ Web Cryptography API}, use the OID rsaEncryption
 * (1.2.840.113549.1.1.1) instead for all RSA algorithms.
 *
 * @example
 *
 * ```js
 * const algorithm = 'ES256'
 * const spki = `-----BEGIN PUBLIC KEY-----
 * MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEFlHHWfLk0gLBbsLTcuCrbCqoHqmM
 * YJepMC+Q+Dd6RBmBiA41evUsNMwLeN+PNFqib+xwi9JkJ8qhZkq8Y/IzGg==
 * -----END PUBLIC KEY-----`
 * const ecPublicKey = await jose.importSPKI(spki, algorithm)
 * ```
 *
 * @param spki PEM-encoded SPKI string
 * @param alg (Only effective in Web Crypto API runtimes) JSON Web Algorithm identifier to be used
 *   with the imported key, its presence is only enforced in Web Crypto API runtimes. See
 *   {@link https://github.com/panva/jose/issues/210 Algorithm Key Requirements}.
 */
export declare function importSPKI<KeyLikeType extends KeyLike = KeyLike>(spki: string, alg: string, options?: PEMImportOptions): Promise<KeyLikeType>;
/**
 * Imports the SPKI from an X.509 string certificate as a runtime-specific public key representation
 * (KeyObject or CryptoKey).
 *
 * Note: The OID id-RSASSA-PSS (1.2.840.113549.1.1.10) is not supported in
 * {@link https://w3c.github.io/webcrypto/ Web Cryptography API}, use the OID rsaEncryption
 * (1.2.840.113549.1.1.1) instead for all RSA algorithms.
 *
 * @example
 *
 * ```js
 * const algorithm = 'ES256'
 * const x509 = `-----BEGIN CERTIFICATE-----
 * MIIBXjCCAQSgAwIBAgIGAXvykuMKMAoGCCqGSM49BAMCMDYxNDAyBgNVBAMMK3Np
 * QXBNOXpBdk1VaXhXVWVGaGtjZXg1NjJRRzFyQUhXaV96UlFQTVpQaG8wHhcNMjEw
 * OTE3MDcwNTE3WhcNMjIwNzE0MDcwNTE3WjA2MTQwMgYDVQQDDCtzaUFwTTl6QXZN
 * VWl4V1VlRmhrY2V4NTYyUUcxckFIV2lfelJRUE1aUGhvMFkwEwYHKoZIzj0CAQYI
 * KoZIzj0DAQcDQgAE8PbPvCv5D5xBFHEZlBp/q5OEUymq7RIgWIi7tkl9aGSpYE35
 * UH+kBKDnphJO3odpPZ5gvgKs2nwRWcrDnUjYLDAKBggqhkjOPQQDAgNIADBFAiEA
 * 1yyMTRe66MhEXID9+uVub7woMkNYd0LhSHwKSPMUUTkCIFQGsfm1ecXOpeGOufAh
 * v+A1QWZMuTWqYt+uh/YSRNDn
 * -----END CERTIFICATE-----`
 * const ecPublicKey = await jose.importX509(x509, algorithm)
 * ```
 *
 * @param x509 X.509 certificate string
 * @param alg (Only effective in Web Crypto API runtimes) JSON Web Algorithm identifier to be used
 *   with the imported key, its presence is only enforced in Web Crypto API runtimes. See
 *   {@link https://github.com/panva/jose/issues/210 Algorithm Key Requirements}.
 */
export declare function importX509<KeyLikeType extends KeyLike = KeyLike>(x509: string, alg: string, options?: PEMImportOptions): Promise<KeyLikeType>;
/**
 * Imports a PEM-encoded PKCS#8 string as a runtime-specific private key representation (KeyObject
 * or CryptoKey).
 *
 * Note: The OID id-RSASSA-PSS (1.2.840.113549.1.1.10) is not supported in
 * {@link https://w3c.github.io/webcrypto/ Web Cryptography API}, use the OID rsaEncryption
 * (1.2.840.113549.1.1.1) instead for all RSA algorithms.
 *
 * @example
 *
 * ```js
 * const algorithm = 'ES256'
 * const pkcs8 = `-----BEGIN PRIVATE KEY-----
 * MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgiyvo0X+VQ0yIrOaN
 * nlrnUclopnvuuMfoc8HHly3505OhRANCAAQWUcdZ8uTSAsFuwtNy4KtsKqgeqYxg
 * l6kwL5D4N3pEGYGIDjV69Sw0zAt43480WqJv7HCL0mQnyqFmSrxj8jMa
 * -----END PRIVATE KEY-----`
 * const ecPrivateKey = await jose.importPKCS8(pkcs8, algorithm)
 * ```
 *
 * @param pkcs8 PEM-encoded PKCS#8 string
 * @param alg (Only effective in Web Crypto API runtimes) JSON Web Algorithm identifier to be used
 *   with the imported key, its presence is only enforced in Web Crypto API runtimes. See
 *   {@link https://github.com/panva/jose/issues/210 Algorithm Key Requirements}.
 */
export declare function importPKCS8<KeyLikeType extends KeyLike = KeyLike>(pkcs8: string, alg: string, options?: PEMImportOptions): Promise<KeyLikeType>;
/**
 * Imports a JWK to a runtime-specific key representation (KeyLike). Either the JWK "alg"
 * (Algorithm) Parameter, or the optional "alg" argument, must be present.
 *
 * Note: When the runtime is using {@link https://w3c.github.io/webcrypto/ Web Cryptography API} the
 * jwk parameters "use", "key_ops", and "ext" are also used in the resulting `CryptoKey`.
 *
 * @example
 *
 * ```js
 * const ecPublicKey = await jose.importJWK(
 *   {
 *     crv: 'P-256',
 *     kty: 'EC',
 *     x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
 *     y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo',
 *   },
 *   'ES256',
 * )
 *
 * const rsaPublicKey = await jose.importJWK(
 *   {
 *     kty: 'RSA',
 *     e: 'AQAB',
 *     n: '12oBZRhCiZFJLcPg59LkZZ9mdhSMTKAQZYq32k_ti5SBB6jerkh-WzOMAO664r_qyLkqHUSp3u5SbXtseZEpN3XPWGKSxjsy-1JyEFTdLSYe6f9gfrmxkUF_7DTpq0gn6rntP05g2-wFW50YO7mosfdslfrTJYWHFhJALabAeYirYD7-9kqq9ebfFMF4sRRELbv9oi36As6Q9B3Qb5_C1rAzqfao_PCsf9EPsTZsVVVkA5qoIAr47lo1ipfiBPxUCCNSdvkmDTYgvvRm6ZoMjFbvOtgyts55fXKdMWv7I9HMD5HwE9uW839PWA514qhbcIsXEYSFMPMV6fnlsiZvQQ',
 *   },
 *   'PS256',
 * )
 * ```
 *
 * @param jwk JSON Web Key.
 * @param alg (Only effective in Web Crypto API runtimes) JSON Web Algorithm identifier to be used
 *   with the imported key. Default is the "alg" property on the JWK, its presence is only enforced
 *   in Web Crypto API runtimes. See
 *   {@link https://github.com/panva/jose/issues/210 Algorithm Key Requirements}.
 */
export declare function importJWK<KeyLikeType extends KeyLike = KeyLike>(jwk: JWK, alg?: string): Promise<KeyLikeType | Uint8Array>;
