import { HospitalUserRepository } from '../repositories/hospital-user.repository';
import { HospitalUser } from '../models/hospital-user.model';
import { UserService } from '@loopback/authentication';
import { PasswordHasher } from './hash.password.bcryptjs';
import { CompanyUser } from '../models';
import { CompanyUserRepository } from '../repositories';
import { Credentials } from '../repositories/credentials-Interface';
import { UserProfile } from '@loopback/security';
export declare class MyUserService implements UserService<HospitalUser | CompanyUser, Credentials> {
    companyUserRepository: CompanyUserRepository;
    hospitalUserRepository: HospitalUserRepository;
    passwordHasher: PasswordHasher;
    constructor(companyUserRepository: CompanyUserRepository, hospitalUserRepository: HospitalUserRepository, passwordHasher: PasswordHasher);
    userRepository: any;
    verifyCredentials(credentials: Credentials): Promise<CompanyUser | HospitalUser>;
    createFoundUser(foundUser: (HospitalUser | CompanyUser), credentials: Credentials): Promise<HospitalUser | CompanyUser>;
    convertToUserProfile(user: CompanyUser): UserProfile;
}
