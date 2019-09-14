import { HospitalUserRepository } from '../repositories/hospital-user.repository';
import { HospitalUser } from '../models/hospital-user.model';
import { UserService, UserProfile } from '@loopback/authentication';
import { PasswordHasher } from './hash.password.bcryptjs';
import { CompanyUser } from '../models';
import { CompanyUserRepository } from '../repositories';
import { Credentials } from '../repositories/credentials-Interface';
export declare class MyUserService implements UserService<HospitalUser | CompanyUser, Credentials> {
    hospitalUserRepository: HospitalUserRepository;
    companyUserRepository: CompanyUserRepository;
    passwordHasher: PasswordHasher;
    constructor(hospitalUserRepository: HospitalUserRepository, companyUserRepository: CompanyUserRepository, passwordHasher: PasswordHasher);
    userRepository: any;
    verifyCredentials(user: string, credentials: Credentials): Promise<HospitalUser | CompanyUser>;
    convertToUserProfile(user: (HospitalUser | CompanyUser)): UserProfile;
}
