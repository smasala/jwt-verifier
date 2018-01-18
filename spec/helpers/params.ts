import { JWKey } from "../../src/shared/jwkey";

// tslint:disable:max-line-length
export const HS256_TOKEN: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
export const HS256_SECRET: string = "secret";
export const HS256_UNSIGNED_TOKEN: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9";
export const HS256_TOKEN_WITH_KID: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhlbGxvYnVubnkifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.M4LIJrzhYGj7O7Cb77_c8kDw2zl_1DrAM3RzHzIKZOE";

export const RS256_TOKEN: string = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.EkN-DOsnsuRjRO6BxXemmJDm3HbxrbRzXglbN2S4sOkopdU4IsDxTI8jO19W_A4K8ZPJijNLis4EZsHeY559a4DFOd50_OqgHGuERTqYZyuhtF39yxJPAjUESwxk2J5k_4zM3O-vtd1Ghyo4IbqKKSy6J9mTniYJPenn5-HIirE";
export const RS256_PUBLIC_KEY: string = "-----BEGIN PUBLIC KEY----- MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdlatRjRjogo3WojgGHFHYLugdUWAY9iR3fy4arWNA1KoS8kVw33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQsHUfQrSDv+MuSUMAe8jzKE4qW+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5Do2kQ+X5xK9cipRgEKwIDAQAB -----END PUBLIC KEY-----";
export const RS256_UNSIGNED_TOKEN: string = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9";
export const RS256_TOKEN_WITH_KID: string = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhlbGxvYnVubnkifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.3HHRS4hDEd_RkzTNUFbz4V02LWPp03ZCaMeU3St3Nhzmz9dXans4nt2MSn4jR_s4uN4u0Lkavu0sEtn0sUinRPtYV_bmCHDa7Ah0DGsVN_qNKMcd9QOzcvwj9NOqS_hEf8IOwiYYjFYwNygqBO0rCfcq7nHrbtc0TYLzNKtf-zs";

export const JWKS_JSON_OBJECT: { keys: JWKey[] } = {
    keys: [{
        alg: "RS256",
        e: "AQAB",
        kid: "elAcizxF0SmAscOA381C7-qSjViLnWG9F1TJ4h-WQlk",
        kty: "RSA",
        n: "zoUccakD6-Kq3-1Yzj4h56TdL7rU_G2tZyMUoLy4DMUP-9wjpRZ5_5JOs2j6OockgwL1Skg4JezQ7Wo_FRoqNORaV7DjOe5i4RzV9aCnDxP9mtMJCrKddJRPbPppBsznH4NnXC2savAZHZ-MyMFVgH0qLcT4AZXClPAwcGL496te8sg7PJ4LSqlHJEctJ2xieI7eXGao2KDckbcz0wp0PkAGhZ5gGqlQ-phiEOJ6bWViemI0pDTd7HipTwWVsACREL1JNTDq6TUKqBjEgjgaWuGYOxl0ccLqi9ntAgvDguvAK0IqVJdDF1F4Ghhow85CXGaIfYcHauM3x5VC6TVmPw",
        use: "sig"
    }]
};
export const JWKS_JSON_STRING: string = JSON.stringify(JWKS_JSON_OBJECT);
