import * as node_https from "https";
import { Observable } from "rxjs/Observable";
import { HTTPS } from "../src/helpers/https";

describe("HTTP: ", () => {

    it("get()", () => {
        spyOn(node_https, "get").and.callThrough();
        expect(HTTPS.get("/") instanceof Observable).toBeTruthy();
    });

});
