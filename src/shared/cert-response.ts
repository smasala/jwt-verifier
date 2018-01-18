import { JWKey } from "./jwkey";

/**
 * Represents a JSON Webtoken Keyset certification response
 */
export interface CertResponse {
    keys: JWKey[];
}
