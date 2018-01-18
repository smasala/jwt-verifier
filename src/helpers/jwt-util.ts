import { atob } from "atob";
import { JWT } from "../shared/jwt/jwt";
import { JWTHeader } from "../shared/jwt/jwt-header";

/**
 * JWT util helper class.
 */
export class JWTUtil {

    /**
     * Converts the given token into a {JWT} JSON object.
     * @param token string
     * @returns {JWT}
     */
    public static convertToJWT(token: string): JWT {
        if (!token) {
            throw new Error("Invalid token, a token must be given");
        }
        const items: string[] = token.split(".");
        if (items.length < 3) {
            throw new Error(`Incorrect JWT format. Should consist of 3 parts. Has it been signed?`);
        }
        return {
            header: JWTUtil.decode(items[0]) as JWTHeader,
            payload: JWTUtil.decode(items[1]),
            signature: atob(items[2])
        };
    }

    /**
     * Retrieves the kid out of the JWT header.
     * @param token string
     * @returns {string} kid
     */
    public static getKidFromToken(token: string): string {
        return JWTUtil.convertToJWT(token).header.kid;
    }

    public static getAlgFromToken(token: string): string {
        return JWTUtil.convertToJWT(token).header.alg;
    }

    private static decode(part: string): {} {
        return JSON.parse(atob(part));
    }

}
