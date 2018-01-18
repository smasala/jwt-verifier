/**
 * Represent a JWTheader object.
 */
export interface JWTHeader {
    alg: string;
    typ: string;
    kid: string;
}
