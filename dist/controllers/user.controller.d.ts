import { HospitalUser } from '../models';
import { HospitalUserRepository, CompanyUserRepository, TenderProcessRepository } from '../repositories';
import { UserProfile } from '@loopback/security';
import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from '../repositories/credentials-Interface';
export declare class UserController {
    jwtService: TokenService;
    userService: UserService<HospitalUser, Credentials>;
    hospitalUserRepository: HospitalUserRepository;
    companyUserRepository: CompanyUserRepository;
    tenderProcessRepository: TenderProcessRepository;
    constructor(jwtService: TokenService, userService: UserService<HospitalUser, Credentials>, hospitalUserRepository: HospitalUserRepository, companyUserRepository: CompanyUserRepository, tenderProcessRepository: TenderProcessRepository);
    printCurrentUser(currentUserProfile: UserProfile): Promise<UserProfile>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    delete(): Promise<void>;
}
