import { JWTHeader } from "./jwt-header";

/**
 * Represents the JWT decoded structure.
 */
export interface JWT {
    header: JWTHeader;
    payload: {};
    signature: string;
}
