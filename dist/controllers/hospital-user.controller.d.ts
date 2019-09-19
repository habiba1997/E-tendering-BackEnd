import { Filter } from '@loopback/repository';
import { HospitalUser } from '../models';
import { HospitalUserRepository } from '../repositories';
import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from '../repositories/credentials-Interface';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
export declare class HospitalUserController {
    userRepository: HospitalUserRepository;
    passwordHasher: PasswordHasher;
    jwtService: TokenService;
    userService: UserService<HospitalUser, Credentials>;
    constructor(userRepository: HospitalUserRepository, passwordHasher: PasswordHasher, jwtService: TokenService, userService: UserService<HospitalUser, Credentials>);
    deleteById(id: string): Promise<HospitalUser>;
    create(user: HospitalUser): Promise<HospitalUser>;
    findById(userId: string): Promise<HospitalUser>;
    find(filter?: Filter<HospitalUser>): Promise<HospitalUser[]>;
    updateById(id: string, hospitalUser: HospitalUser): Promise<void>;
}
