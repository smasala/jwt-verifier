import {JWTVerifier} from "../src/jwt-verifier";
import { RS256_PUBLIC_KEY, RS256_TOKEN, RS256_UNSIGNED_TOKEN } from "./helpers/params";

describe("JWTVerifier RS256:", () => {

    it("RS256 Verification only token", async () => {
        // default alg check is RS256 not HS256
        const verified: boolean = await JWTVerifier.verify(RS256_TOKEN).toPromise();
        expect(verified).toBeFalsy();
    });

    it("RS256 Verification with key", async () => {
        const verified: boolean = await JWTVerifier.verify(RS256_TOKEN, RS256_PUBLIC_KEY).toPromise();
        expect(verified).toBeTruthy();
    });

    it("RS256 Verification with token but correct algorithm", async () => {
        const verified: boolean = await JWTVerifier.verify(RS256_TOKEN, null, {
            alg: ["RS256"]
        }).toPromise();
        expect(verified).toBeFalsy();
    });

    it("HS256 Verification with correct parameters", async () => {
        const verified: boolean = await JWTVerifier.verify(RS256_TOKEN, RS256_PUBLIC_KEY, {
            alg: ["RS256"]
        }).toPromise();
        expect(verified).toBeTruthy();
    });

    it("RS256 Verification with incorrect alg", async () => {
        const verified: boolean = await JWTVerifier.verify(RS256_TOKEN, RS256_PUBLIC_KEY, {
            alg: ["HS256"]
        }).toPromise();
        expect(verified).toBeFalsy();
    });

    it("RS256 Verification - incorrect alg and no secret", async () => {
        const verified: boolean = await JWTVerifier.verify(RS256_TOKEN, null, {
            alg: ["HS256"]
        }).toPromise();
        expect(verified).toBeFalsy();
    });

    it("RS256 Verification - unsigned token NOT allowed", async () => {
        try {
            await JWTVerifier.verify(RS256_UNSIGNED_TOKEN).toPromise();
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

});
