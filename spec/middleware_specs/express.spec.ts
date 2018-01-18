import { Request } from "express-serve-static-core";
import { ExpressMiddleware } from "../../src/middleware/express";
import { RS256_TOKEN } from "../helpers/params";

class MockRequest {
    public data: {} = {};
    public get(key: string): string {
        return this.data[key];
    }
    public set(key: string, val: string): void {
        this.data[key] = val;
    }
}

describe("Expressmiddleware: ", () => {

    let mock: {};
    const KEY: string = "Authorization";
    const AUTH_TOKEN: string = `Bearer ${RS256_TOKEN}`;

    beforeEach(() => {
        mock = new MockRequest();
    });

    it("fake token", () => {
        (mock as MockRequest).set(KEY, "abdc");
        const auth: string = ExpressMiddleware.getAuthToken(mock as Request);
        expect(auth).toBeNull();
    });

    it("no token", () => {
        (mock as MockRequest).set(KEY, "");
        const auth: string = ExpressMiddleware.getAuthToken(mock as Request);
        expect(auth).toBeNull();

        (mock as MockRequest).set(KEY, null);
        const auth1: string = ExpressMiddleware.getAuthToken(mock as Request);
        expect(auth1).toBeNull();

        (mock as MockRequest).set(KEY, undefined);
        const auth2: string = ExpressMiddleware.getAuthToken(mock as Request);
        expect(auth2).toBeNull();
    });

    it("no Bearer", () => {
        (mock as MockRequest).set(KEY, RS256_TOKEN);
        const auth: string = ExpressMiddleware.getAuthToken(mock as Request);
        expect(auth).toBeNull();
    });

    it("Correct token", () => {
        (mock as MockRequest).set(KEY, AUTH_TOKEN);
        const auth: string = ExpressMiddleware.getAuthToken(mock as Request);
        expect(auth).toEqual(RS256_TOKEN);
    });

});
