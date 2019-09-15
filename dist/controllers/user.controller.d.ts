import { HospitalUser } from '../models';
import { UserProfile } from '@loopback/security';
import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from '../repositories/credentials-Interface';
export declare class UserController {
    jwtService: TokenService;
    userService: UserService<HospitalUser, Credentials>;
    constructor(jwtService: TokenService, userService: UserService<HospitalUser, Credentials>);
    printCurrentUser(currentUserProfile: UserProfile): Promise<UserProfile>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
}
