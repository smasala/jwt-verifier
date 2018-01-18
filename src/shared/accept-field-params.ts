// See: http://kjur.github.io/jsrsasign/api/symbols/KJUR.jws.JWS.html#.verifyJWT

/**
 * Represent the "accept field parameters" for jsrsasign.
 */
export interface AcceptFieldParams {
    /**
     * array of acceptable signature algorithm names (ex. ["HS256", "HS384"])
     */
    alg: string[];
    /**
     * array of acceptable issuer names (ex. ['http://foo.com'])
     */
    iss?: string[];
    /**
     * array of acceptable subject names (ex. ['mailto:john@foo.com'])
     */
    sub?: string[];
    /**
     * array or string of acceptable audience name(s) (ex. ['http://foo.com'])
     */
    aud?: string[];
    /**
     * string of acceptable JWT ID (OPTION) (ex. 'id1234')
     */
    jti?: string;
    /**
     * time to verify 'nbf', 'iat' and 'exp' in UNIX seconds (OPTION) (ex. 1377663900).
     * If this is not specified, current time of verifier will be used.
     * KJUR.jws.IntDate may be useful to specify it.
     */
    verifyAt?: number;
    /**
     * acceptable time difference between signer and verifier in seconds (ex. 3600).
     * If this is not specified, zero will be used.
     */
    gracePeriod?: string;
}
