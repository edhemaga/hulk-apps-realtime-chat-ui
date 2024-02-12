import { JwtPayload } from "jwt-decode";

export interface JwtPayloadUserClaims extends JwtPayload {
    id: string;
    email: string;
}
