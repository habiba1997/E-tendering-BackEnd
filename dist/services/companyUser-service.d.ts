import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { CompanyUser } from '../models';
import { CompanyUserRepository } from '../repositories';
import { Credentials } from '../repositories/credentials-Interface';
import { foundUser } from './foundUser-service';
export declare class MyCompanyUserService implements UserService<CompanyUser, Credentials> {
    companyUserRepository: CompanyUserRepository;
    private foundUserClass;
    constructor(companyUserRepository: CompanyUserRepository, foundUserClass: foundUser);
    userRepository: any;
    verifyCredentials(credentials: Credentials): Promise<CompanyUser>;
    convertToUserProfile(user: CompanyUser): UserProfile;
}
