/// <reference types="express" />
import { Request } from '@loopback/rest';
import { AuthenticationStrategy, UserProfile, TokenService } from '@loopback/authentication';
export declare class JWTAuthenticationStrategy implements AuthenticationStrategy {
    tokenService: TokenService;
    name: string;
    constructor(tokenService: TokenService);
    authenticate(request: Request): Promise<UserProfile | undefined>;
    extractCredentials(request: Request): string;
}
