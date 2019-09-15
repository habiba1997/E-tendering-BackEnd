import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { HospitalUser } from '../models';
import { HospitalUserRepository } from '../repositories';
import { Credentials } from '../repositories/credentials-Interface';
import { foundUser } from './foundUser-service';
export declare class MyHospitalUserService implements UserService<HospitalUser, Credentials> {
    hospitalUserRepository: HospitalUserRepository;
    private foundUserClass;
    constructor(hospitalUserRepository: HospitalUserRepository, foundUserClass: foundUser);
    userRepository: any;
    verifyCredentials(credentials: Credentials): Promise<HospitalUser>;
    convertToUserProfile(user: HospitalUser): UserProfile;
}
