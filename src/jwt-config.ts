/**
 * Singleton Config helper class
 */
export class JWTConfig {

    /**
     * The URL called to retrieve the public JWKS.
     * @property
     * @type {string}
     */
    public CERT_URL: string;

    private static _instance: JWTConfig;

    /**
     * Returns which encryption algorithms are supported.
     * @returns {string[]}
     */
    public get SUPPORTED_ALGS(): string[] {
        return ["RS256", "HS256"];
    }

    public get DEFAULT_ALG(): string {
        return "RS256";
    }

    public static get instance(): JWTConfig {
        if (!JWTConfig._instance) {
            this._instance = new JWTConfig();
        }
        return this._instance;
    }

}
