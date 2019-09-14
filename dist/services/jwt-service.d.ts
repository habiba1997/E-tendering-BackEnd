import { TokenService, UserProfile } from '@loopback/authentication';
export declare class JWTService implements TokenService {
    private jwtSecret;
    private jwtExpiresIn;
    constructor(jwtSecret: string, jwtExpiresIn: string);
    verifyToken(token: string): Promise<UserProfile>;
    generateToken(userProfile: UserProfile): Promise<string>;
}
