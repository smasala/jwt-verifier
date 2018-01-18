import { Request } from "express-serve-static-core";

const BEARER: string = "Bearer ";

export class ExpressMiddleware {

    public static getAuthToken(request: Request): string {
        const auth: string = request.get("Authorization");
        if (auth && auth.indexOf(BEARER) === 0) {
            return auth.replace(BEARER, "");
        }
        return null;
    }

}
