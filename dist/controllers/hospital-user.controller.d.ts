import { Count, Filter, Where } from '@loopback/repository';
import { HospitalUser } from '../models';
import { HospitalUserRepository } from '../repositories';
import { UserProfile, TokenService, UserService } from '@loopback/authentication';
import { Credentials } from '../repositories/credentials-Interface';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
export declare class HospitalUserController {
    userRepository: HospitalUserRepository;
    passwordHasher: PasswordHasher;
    jwtService: TokenService;
    userService: UserService<HospitalUser, Credentials>;
    constructor(userRepository: HospitalUserRepository, passwordHasher: PasswordHasher, jwtService: TokenService, userService: UserService<HospitalUser, Credentials>);
    deleteById(id: string): Promise<HospitalUser>;
    updateAll(user: HospitalUser, where?: Where<HospitalUser>): Promise<Count>;
    create(user: HospitalUser): Promise<HospitalUser>;
    count(where?: Where<HospitalUser>): Promise<Count>;
    findById(userId: string): Promise<HospitalUser>;
    find(filter?: Filter<HospitalUser>): Promise<HospitalUser[]>;
    printCurrentUser(currentUserProfile: UserProfile): Promise<UserProfile>;
    loginID(credentials: Credentials): Promise<{
        token: string;
    }>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    updateById(id: string, hospitalUser: HospitalUser): Promise<void>;
    replaceById(id: string, hospitalUser: HospitalUser): Promise<void>;
}
