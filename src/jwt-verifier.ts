import * as includes from "array-includes";
import { KJUR, RSAKey } from "jsrsasign/lib/jsrsasign";
import * as _merge from "lodash/merge";
import { Observable } from "rxjs/Observable";
import { JWTUtil } from "./helpers/jwt-util";
import { JWTConfig } from "./jwt-config";
import { KeyFetcher } from "./key-fetcher";
import { AcceptFieldParams } from "./shared/accept-field-params";

const DEFAULT_PARAMS: AcceptFieldParams = {
    alg: [JWTConfig.instance.DEFAULT_ALG]
};

export class JWTVerifier {

    /**
     * Verify your JWT token
     * @param token {string}
     * @param acceptFieldParams {AcceptFieldParams} addition field params to verify?
     *      https://kjur.github.io/jsrsasign/api/symbols/KJUR.jws.JWS.html#.verifyJWT
     * @param allowUnsigned {boolean} [default=JWTConfig.ALLOW_UNSIGNED] are unsigned JWT's allowed?
     * @method
     * @returns {boolean}
     */
    public static verify(
        token: string,
        key?: string | RSAKey,
        acceptFieldParams?: AcceptFieldParams): Observable<boolean> {
        // generate params for the jsrsasign
        const params: AcceptFieldParams = this.generateParams(acceptFieldParams);
        // check to make sure that the correct algorithm is used
        const alg: string = JWTUtil.getAlgFromToken(token);
        if (JWTVerifier.isSupportedAlgorithm(alg)) {
            if (key) {
                return JWTVerifier.verifyToken(alg, token, key, params);
            } else {
                return JWTVerifier.verifyRSAToken(token, params);
            }
        } else {
            throw new Error(`No supported algorithm found for: '${params.alg.join(", ")}'`);
        }
    }

    /**
     * Is the given algorithm supported?
     * @param alg
     * @returns {boolean}
     */
    public static isSupportedAlgorithm(alg: string): boolean {
        return includes(JWTConfig.instance.SUPPORTED_ALGS, alg);
    }

    private static verifyToken(
        alg: string,
        token: string,
        key: string | RSAKey,
        params: AcceptFieldParams): Observable<boolean> {
            // Return an Observable to remain consistent with the rest
            const resp: Observable<boolean> = Observable.create((observer) => {
                observer.next(KJUR.jws.JWS.verifyJWT(token, KeyFetcher.prepareKey(key, alg), params));
                observer.complete();
            });
            return resp;
    }

    private static verifyRSAToken(token: string, params: AcceptFieldParams): Observable<boolean> {
        const res: Observable<boolean> = Observable.create((observer) => {
            // retrieve the kid from the token header
            const kid: string = JWTUtil.getKidFromToken(token);
            if (kid) {
                // find the correct RSAKey for the kid
                KeyFetcher.getRSAKeyForKid(kid).subscribe((key: RSAKey) => {
                    observer.next(KJUR.jws.JWS.verifyJWT(token, key, params));
                    observer.complete();
                });
            } else {
                // No kid in token header
                observer.next(false);
                observer.complete();
                throw new Error("No kid found in token");
            }
        });
        return res;
    }

    /**
     * Generate params by merging the given parameters with the default settings.
     * @param params {AcceptFieldParams} object to merge with default settings
     * @method
     * @returns {AcceptFieldParams}
     */
    private static generateParams(params?: AcceptFieldParams): AcceptFieldParams {
        const p: AcceptFieldParams =
            _merge(
                _merge({}, DEFAULT_PARAMS),
                params || {}
            );
        return p;
    }

}
