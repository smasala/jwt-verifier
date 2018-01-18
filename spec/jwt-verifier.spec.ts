import {JWTVerifier} from "../src/jwt-verifier";

describe("JWTVerifier:", () => {

    it("Supported algorithms", () => {
        expect(JWTVerifier.isSupportedAlgorithm("ABC")).toBeFalsy();
        expect(JWTVerifier.isSupportedAlgorithm("XS256")).toBeFalsy();
        expect(JWTVerifier.isSupportedAlgorithm("RS256")).toBeTruthy();
        expect(JWTVerifier.isSupportedAlgorithm("HS256")).toBeTruthy();
    });

    it("HS256 Verification - no values", async () => {
        try {
            await JWTVerifier.verify("").toPromise();
        } catch (e) {
            expect(e).toBeDefined();
        }

        try {
            await JWTVerifier.verify(null).toPromise();
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    it("HS256 Verification - no token or secret", async () => {
        try {
            await JWTVerifier.verify("", null, {
                alg: ["RS256"]
            }).toPromise();
        } catch (e) {
            expect(e).toBeDefined();
        }

        try {
            await JWTVerifier.verify(null, null, {
                alg: ["RS256"]
            }).toPromise();
        } catch (e) {
            expect(e).toBeDefined();
        }

        try {
            await JWTVerifier.verify(null, null, {
                alg: ["HS256"]
            }).toPromise();
        } catch (e) {
            expect(e).toBeDefined();
        }

        try {
            await JWTVerifier.verify("", null, {
                alg: ["HS256"]
            }).toPromise();
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

});
