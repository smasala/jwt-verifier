# JWT-Verifier

JWT (JSON Web Tokens) and JWKS (JSON Web Key Set) verifier for node / typescript (https://jwt.io)

Works with Express (https://expressjs.com/)

Uses jsrsasign to verify tokens (https://kjur.github.io/jsrsasign/)

## Supported Algorithms

* RS256
* HS256

## Installation

`npm install jwt-verifier --save`

## Usage

### Basic

```js
// JWTVerifier.verify() returns an Observable (http://reactivex.io/rxjs/)
JWTVerifier.verify(auth).subscribe((verified: boolean) => {});
```

### Express middleware

```js
    import * as express from "express";
    import { JWTConfig, JWTVerifier } from "jwt-verifier";
    import { ExpressMiddleware } from "jwt-verifier/dist/middleware";
    const app: express.Express = express();

    // Needed if you wish to auto retrieve your JWKS from a URL.
    JWTConfig.instance.CERT_URL = "https://somejkwserver/jwks";

    // Add express middleware to check auth token
    app.use((req, res, next) => {
    const auth: string = ExpressMiddleware.getAuthToken(req);
    if (auth) {
        JWTVerifier
            .verify(auth).subscribe((verified: boolean) => {
                console.info("Verified:", verified);
                next();
            });
    } else {
        // Unauthorized
        res.sendStatus(401);
    }
    });
```

### API

* JWTVerifier.verify(token: string, key?: string | RSAKey, acceptFieldParams?: AcceptFieldParams) - returns Observable\<boolean\> (http://reactivex.io/rxjs/).
    * token: string | required
    * key: string (HS256 key) or RSAKey | optional - see https://kjur.github.io/jsrsasign/api/symbols/KJUR.jws.JWS.html#.verifyJWT
    * acceptFieldParams: Object | optional - see https://kjur.github.io/jsrsasign/api/symbols/KJUR.jws.JWS.html#.verifyJWT

# Contributions

Contributions are welcome via issues / pull requests

## Tests

Unit tests are run with `npm run test`

## Build

Build is run with `npm run build`