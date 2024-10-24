import type { JWSHeaderParameters, JWEHeaderParameters } from '../types.d';
export type ProtectedHeaderParameters = JWSHeaderParameters & JWEHeaderParameters;
/**
 * Decodes the Protected Header of a JWE/JWS/JWT token utilizing any JOSE serialization.
 *
 * @example
 *
 * ```js
 * const protectedHeader = jose.decodeProtectedHeader(token)
 * console.log(protectedHeader)
 * ```
 *
 * @param token JWE/JWS/JWT token in any JOSE serialization.
 */
export declare function decodeProtectedHeader(token: string | object): ProtectedHeaderParameters;
