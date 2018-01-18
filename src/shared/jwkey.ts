/**
 * Represents a Json Webtoken Key within a JSON Webtoken Keyset.
 */
export interface JWKey {
    alg: string;
    e: string;
    kid: string;
    kty: string;
    n: string;
    use: string;
}
