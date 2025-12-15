export interface JWT {
    exp: Date;
    iat: Date;
    user_id: string;
    name: string;
    email: string;
    service: string;
    session_id: number;
}
