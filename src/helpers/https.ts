import { IncomingMessage } from "http";
import * as node_https from "https";
import { Observable } from "rxjs/Observable";

/**
 * HTTPS helper class to enable easy https requests.
 */
export class HTTPS {
    public static get<T>(url: string): Observable<T> {
        return Observable.create((observer) => {
            node_https.get(url, (resp: IncomingMessage) => {
                let data: string = "";
                resp.on("data", (chunk) => {
                    data += chunk;
                });
                resp.on("end", () => {
                    observer.next(JSON.parse(data));
                    observer.complete();
                });
            });
        });
    }
}
