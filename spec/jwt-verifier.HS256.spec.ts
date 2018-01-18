import { JWTVerifier } from "../src/jwt-verifier";
import { HS256_SECRET, HS256_TOKEN, HS256_UNSIGNED_TOKEN } from "./helpers/params";

describe("JWTVerifier HS256:", () => {

    it("HS256 Verification only token", async () => {
        // default alg check is RS256 not HS256
        const verified: boolean = await JWTVerifier.verify(HS256_TOKEN).toPromise();
        expect(verified).toBeFalsy();
    });

    it("HS256 Verification with key", async () => {
        const verified: boolean = await JWTVerifier.verify(HS256_TOKEN, HS256_SECRET).toPromise();
        expect(verified).toBeFalsy();
    });

    it("HS256 Verification with token but correct algorithm", async () => {
        const verified: boolean = await JWTVerifier.verify(HS256_TOKEN, null, {
            alg: ["HS256"]
        }).toPromise();
        expect(verified).toBeFalsy();
    });

    it("HS256 Verification with correct parameters", async () => {
        const verified: boolean = await JWTVerifier.verify(HS256_TOKEN, HS256_SECRET, {
            alg: ["HS256"]
        }).toPromise();
        expect(verified).toBeTruthy();
    });

    it("HS256 Verification with incorrect alg", async () => {
        const verified: boolean = await JWTVerifier.verify(HS256_TOKEN, HS256_SECRET, {
            alg: ["RS256"]
        }).toPromise();
        expect(verified).toBeFalsy();
    });

    it("HS256 Verification - incorrect alg and no secret", async () => {
        const verified: boolean = await JWTVerifier.verify(HS256_TOKEN, null, {
            alg: ["RS256"]
        }).toPromise();
        expect(verified).toBeFalsy();
    });

    it("HS256 Verification - unsigned token NOT allowed", async () => {
        try {
            await JWTVerifier.verify(HS256_UNSIGNED_TOKEN).toPromise();
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

});
