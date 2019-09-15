import { Count, Filter, Where } from '@loopback/repository';
import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from '../repositories/credentials-Interface';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
import { CompanyUser } from '../models';
import { CompanyUserRepository } from '../repositories';
export declare class CompanyController {
    userRepository: CompanyUserRepository;
    passwordHasher: PasswordHasher;
    jwtService: TokenService;
    userService: UserService<CompanyUser, Credentials>;
    constructor(userRepository: CompanyUserRepository, passwordHasher: PasswordHasher, jwtService: TokenService, userService: UserService<CompanyUser, Credentials>);
    deleteById(id: string): Promise<CompanyUser>;
    updateAll(user: CompanyUser, where?: Where<CompanyUser>): Promise<Count>;
    create(user: CompanyUser): Promise<CompanyUser>;
    count(where?: Where<CompanyUser>): Promise<Count>;
    findById(userId: string): Promise<CompanyUser>;
    find(filter?: Filter<CompanyUser>): Promise<CompanyUser[]>;
    updateById(id: string, companyUser: CompanyUser): Promise<void>;
    replaceById(id: string, companyUser: CompanyUser): Promise<void>;
}
