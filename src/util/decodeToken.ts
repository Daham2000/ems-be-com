import jwtDecode from "jwt-decode";

export interface JwtPayloadType {
    iss?: string;
    admin?: boolean;
    orgId?: string;
    sub?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
}

export const decodeToken = (token: string): JwtPayloadType => {
    return jwtDecode<JwtPayloadType>(token);
};