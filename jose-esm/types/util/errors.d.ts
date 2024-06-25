import type { JWTPayload, KeyLike } from '../types.d';
/**
 * A generic Error that all other JOSE specific Error subclasses extend.
 *
 * @example
 *
 * Checking thrown error is a JOSE one
 *
 * ```js
 * if (err instanceof jose.errors.JOSEError) {
 *   // ...
 * }
 * ```
 */
export declare class JOSEError extends Error {
    /**
     * A unique error code for the particular error subclass.
     *
     * @ignore
     */
    static get code(): string;
    /** A unique error code for this particular error subclass. */
    code: string;
    /** @ignore */
    constructor(message?: string);
}
/**
 * An error subclass thrown when a JWT Claim Set member validation fails.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWT_CLAIM_VALIDATION_FAILED') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWTClaimValidationFailed) {
 *   // ...
 * }
 * ```
 */
export declare class JWTClaimValidationFailed extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    code: string;
    /** The Claim for which the validation failed. */
    claim: string;
    /** Reason code for the validation failure. */
    reason: string;
    /**
     * The parsed JWT Claims Set (aka payload). Other JWT claims may or may not have been verified at
     * this point. The JSON Web Signature (JWS) or a JSON Web Encryption (JWE) structures' integrity
     * has however been verified. Claims Set verification happens after the JWS Signature or JWE
     * Decryption processes.
     */
    payload: JWTPayload;
    /** @ignore */
    constructor(message: string, payload: JWTPayload, claim?: string, reason?: string);
}
/**
 * An error subclass thrown when a JWT is expired.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWT_EXPIRED') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWTExpired) {
 *   // ...
 * }
 * ```
 */
export declare class JWTExpired extends JOSEError implements JWTClaimValidationFailed {
    /** @ignore */
    static get code(): 'ERR_JWT_EXPIRED';
    code: string;
    /** The Claim for which the validation failed. */
    claim: string;
    /** Reason code for the validation failure. */
    reason: string;
    /**
     * The parsed JWT Claims Set (aka payload). Other JWT claims may or may not have been verified at
     * this point. The JSON Web Signature (JWS) or a JSON Web Encryption (JWE) structures' integrity
     * has however been verified. Claims Set verification happens after the JWS Signature or JWE
     * Decryption processes.
     */
    payload: JWTPayload;
    /** @ignore */
    constructor(message: string, payload: JWTPayload, claim?: string, reason?: string);
}
/**
 * An error subclass thrown when a JOSE Algorithm is not allowed per developer preference.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JOSE_ALG_NOT_ALLOWED') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JOSEAlgNotAllowed) {
 *   // ...
 * }
 * ```
 */
export declare class JOSEAlgNotAllowed extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JOSE_ALG_NOT_ALLOWED';
    code: string;
}
/**
 * An error subclass thrown when a particular feature or algorithm is not supported by this
 * implementation or JOSE in general.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JOSE_NOT_SUPPORTED') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JOSENotSupported) {
 *   // ...
 * }
 * ```
 */
export declare class JOSENotSupported extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JOSE_NOT_SUPPORTED';
    code: string;
}
/**
 * An error subclass thrown when a JWE ciphertext decryption fails.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWE_DECRYPTION_FAILED') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWEDecryptionFailed) {
 *   // ...
 * }
 * ```
 */
export declare class JWEDecryptionFailed extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JWE_DECRYPTION_FAILED';
    code: string;
    message: string;
}
/**
 * An error subclass thrown when a JWE is invalid.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWE_INVALID') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWEInvalid) {
 *   // ...
 * }
 * ```
 */
export declare class JWEInvalid extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JWE_INVALID';
    code: string;
}
/**
 * An error subclass thrown when a JWS is invalid.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWS_INVALID') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWSInvalid) {
 *   // ...
 * }
 * ```
 */
export declare class JWSInvalid extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JWS_INVALID';
    code: string;
}
/**
 * An error subclass thrown when a JWT is invalid.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWT_INVALID') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWTInvalid) {
 *   // ...
 * }
 * ```
 */
export declare class JWTInvalid extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JWT_INVALID';
    code: string;
}
/**
 * An error subclass thrown when a JWK is invalid.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWK_INVALID') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWKInvalid) {
 *   // ...
 * }
 * ```
 */
export declare class JWKInvalid extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JWK_INVALID';
    code: string;
}
/**
 * An error subclass thrown when a JWKS is invalid.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWKS_INVALID') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWKSInvalid) {
 *   // ...
 * }
 * ```
 */
export declare class JWKSInvalid extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JWKS_INVALID';
    code: string;
}
/**
 * An error subclass thrown when no keys match from a JWKS.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWKS_NO_MATCHING_KEY') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWKSNoMatchingKey) {
 *   // ...
 * }
 * ```
 */
export declare class JWKSNoMatchingKey extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JWKS_NO_MATCHING_KEY';
    code: string;
    message: string;
}
/**
 * An error subclass thrown when multiple keys match from a JWKS.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWKS_MULTIPLE_MATCHING_KEYS') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWKSMultipleMatchingKeys) {
 *   // ...
 * }
 * ```
 */
export declare class JWKSMultipleMatchingKeys extends JOSEError {
    /** @ignore */
    [Symbol.asyncIterator]: () => AsyncIterableIterator<KeyLike>;
    static get code(): 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
    code: string;
    message: string;
}
/**
 * Timeout was reached when retrieving the JWKS response.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWKS_TIMEOUT') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWKSTimeout) {
 *   // ...
 * }
 * ```
 */
export declare class JWKSTimeout extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JWKS_TIMEOUT';
    code: string;
    message: string;
}
/**
 * An error subclass thrown when JWS signature verification fails.
 *
 * @example
 *
 * Checking thrown error is this one using a stable error code
 *
 * ```js
 * if (err.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
 *   // ...
 * }
 * ```
 *
 * @example
 *
 * Checking thrown error is this one using `instanceof`
 *
 * ```js
 * if (err instanceof jose.errors.JWSSignatureVerificationFailed) {
 *   // ...
 * }
 * ```
 */
export declare class JWSSignatureVerificationFailed extends JOSEError {
    /** @ignore */
    static get code(): 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
    code: string;
    message: string;
}
