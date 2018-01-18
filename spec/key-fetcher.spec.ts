import { KEYUTIL, RSAKey } from "jsrsasign/lib/jsrsasign";
import { Observable } from "rxjs/Observable";
import { HTTPS } from "../src/helpers/https";
import { JWTConfig } from "../src/jwt-config";
import { KeyFetcher } from "../src/key-fetcher";
import { HS256_SECRET, JWKS_JSON_OBJECT, JWKS_JSON_STRING, RS256_PUBLIC_KEY } from "./helpers/params";

describe("KeyFetcher: ", () => {

    it("HS256 - prepare key: string token", () => {
        expect(KeyFetcher.prepareKey(HS256_SECRET, "HS256")).toEqual(HS256_SECRET);
    });

    it("HS256 - prepare key with wrong alg", () => {
        try {
            KeyFetcher.prepareKey(HS256_SECRET, "RS256");
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    it("RS256 - prepare key: convert string to RSAKey", () => {
        expect(KeyFetcher.prepareKey(RS256_PUBLIC_KEY, "RS256") instanceof RSAKey).toBeTruthy();
    });

    it("RS256 - prepare key: pass RSAKey", () => {
        const rsakey: RSAKey = KEYUTIL.getKey(RS256_PUBLIC_KEY);
        expect(KeyFetcher.prepareKey(rsakey, "RS256")).toEqual(rsakey);
    });

    it("RS256 - prepare key: wrong alg", () => {
        const rsakey: RSAKey = KEYUTIL.getKey(RS256_PUBLIC_KEY);
        expect(KeyFetcher.prepareKey(rsakey, "HS256")).toEqual(rsakey);
    });

    it("getSignKeys: no CERT URL JWKS", () => {
        try {
            KeyFetcher.getSignKeys();
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    it("getSignKeys: JWKS", async () => {
        JWTConfig.instance.CERT_URL = "/";
        spyOn(HTTPS, "get").and.returnValue(Observable.create((observer) => {
            observer.next(JSON.parse(JWKS_JSON_STRING));
            observer.complete();
        }));
        expect(await KeyFetcher.getSignKeys().toPromise()).toEqual(JWKS_JSON_OBJECT.keys);
    });

    it("getRSAKeyForKid", async () => {
        JWTConfig.instance.CERT_URL = "/";
        spyOn(HTTPS, "get").and.returnValue(Observable.create((observer) => {
            observer.next(JSON.parse(JWKS_JSON_STRING));
            observer.complete();
        }));
        const kid: string = JWKS_JSON_OBJECT.keys[0].kid;
        const rsaKey: RSAKey = KEYUTIL.getKey(JWKS_JSON_OBJECT.keys[0]);
        const retrievedKey: RSAKey = await KeyFetcher.getRSAKeyForKid(kid).toPromise();
        expect(retrievedKey instanceof RSAKey).toBeTruthy();
        expect(retrievedKey.n).toEqual(rsaKey.n); // basic comparison
    });

});
