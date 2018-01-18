import { KEYUTIL, RSAKey } from "jsrsasign/lib/jsrsasign";
import "rxjs/add/operator/map"; // needed for map() on observable
import { Observable } from "rxjs/Observable";
import { HTTPS } from "./helpers/https";
import { JWTConfig } from "./jwt-config";
import { CertResponse } from "./shared/cert-response";
import { JWKey } from "./shared/jwkey";

export class KeyFetcher {

    /**
     * Get all signature keys from the JWKeyset at the given {URL}.
     * @returns {Observable<JWKey[]>}
     */
    public static getSignKeys(): Observable<JWKey[]> {
        if (!JWTConfig.instance.CERT_URL) {
            throw new Error("Please specify a JWTConfig.CERT_URL where the JWKS can be found");
        }
        return HTTPS.get<CertResponse>(JWTConfig.instance.CERT_URL).map((res: CertResponse) => {
            return res.keys.filter((key: JWKey) => {
                // filter for all keys used as signature
                return key.use === "sig";
            });
        });
    }

    /**
     * Get the RSAKey for the specified {kid}
     * @param kid {string}
     * @returns {Observable<RSAKey>}
     */
    public static getRSAKeyForKid(kid: string): Observable<RSAKey> {
        // Create new observable
        return Observable.create((observer) => {
            // Get all signature JWKS
            KeyFetcher.getSignKeys().subscribe((keys: JWKey[]) => {
                // Find JWKS for the given kid
                const kidKey: JWKey = keys.find((key: JWKey) => {
                    return key.kid === kid;
                });
                if (!kidKey) {
                    throw new Error(`No kid found for: ${kid}`);
                }
                observer.next(KEYUTIL.getKey(kidKey));
                observer.complete();
            });
        });
    }

    /**
     * Prepares the key for JWT verification.
     * If the alg is HS256 then the token is simply returned, same with RSAKey.
     * If the the key is an RSAKey as string, it will convert it to an RSAKey object.
     * @param key {string | RSAKey}
     * @param alg {string} [default=RS256]
     * @returns {RSAKey | string}
     */
    public static prepareKey(key: string | RSAKey, alg: string): RSAKey | string {
        if ( alg === "HS256" || key instanceof RSAKey) {
            return key;
        }
        try {
            return KEYUTIL.getKey(key);
        } catch (e) {
            throw new Error(`Looks like you tried to parse a wrong key into RS256.
                Did you mean to set alg as HS256? \n
                ${e}`);
        }
    }

}
