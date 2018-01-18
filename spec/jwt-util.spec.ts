import { JWTUtil } from "../src/helpers/jwt-util";
import { JWT } from "../src/shared/jwt/jwt";
import {
    HS256_TOKEN,
    HS256_TOKEN_WITH_KID,
    HS256_UNSIGNED_TOKEN,
    RS256_TOKEN,
    RS256_TOKEN_WITH_KID,
    RS256_UNSIGNED_TOKEN
} from "./helpers/params";

interface Greet {
    greet: string;
}

describe("JWTUtil", () => {

    it("decoder", () => {
        // private method
        // tslint:disable-next-line:no-string-literal
        const val: Greet  = JWTUtil["decode"]("eyJncmVldCI6ICJoZWxsbyJ9") as Greet;
        expect(val.greet).toBe("hello");
    });

    it("RS256 Convert to JWT", () => {
        const token: JWT = JWTUtil.convertToJWT(RS256_TOKEN);
        expect(token.header).toBeDefined();
        expect(token.payload).toBeDefined();
        expect(token.signature).toBeDefined();
        expect(token.header.alg).toBe("RS256");
    });

    it("HS256 Convert to JWT", () => {
        const token: JWT = JWTUtil.convertToJWT(HS256_TOKEN);
        expect(token.header).toBeDefined();
        expect(token.payload).toBeDefined();
        expect(token.signature).toBeDefined();
        expect(token.header.alg).toBe("HS256");
    });

    it("RS256 Unsigned tokens", () => {
        try {
            JWTUtil.convertToJWT(RS256_UNSIGNED_TOKEN);
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    it("HS256 Unsigned tokens", () => {
        try {
            JWTUtil.convertToJWT(HS256_UNSIGNED_TOKEN);
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    it("No token", () => {
        try {
            JWTUtil.convertToJWT(null);
        } catch (e) {
            expect(e).toBeDefined();
        }
        try {
            JWTUtil.convertToJWT("");
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    it("Get Alg from header", () => {
        expect(JWTUtil.getAlgFromToken(RS256_TOKEN)).toBe("RS256");
        expect(JWTUtil.getAlgFromToken(HS256_TOKEN)).toBe("HS256");
    });

    it("Get kid from header", () => {
        expect(JWTUtil.getKidFromToken(RS256_TOKEN_WITH_KID)).toBe("hellobunny");
        expect(JWTUtil.getKidFromToken(HS256_TOKEN_WITH_KID)).toBe("hellobunny");
    });

});
