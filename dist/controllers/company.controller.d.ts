import { Count, Filter, Where } from '@loopback/repository';
import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from '../repositories/credentials-Interface';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
import { CompanyUser, TenderProcess } from '../models';
import { CompanyUserRepository, TenderProcessRepository } from '../repositories';
import { TenderingProcessEnteredModel } from '../models/company-selected.model';
export declare class CompanyController {
    tenderProcessRepository: TenderProcessRepository;
    userRepository: CompanyUserRepository;
    passwordHasher: PasswordHasher;
    jwtService: TokenService;
    userService: UserService<CompanyUser, Credentials>;
    constructor(tenderProcessRepository: TenderProcessRepository, userRepository: CompanyUserRepository, passwordHasher: PasswordHasher, jwtService: TokenService, userService: UserService<CompanyUser, Credentials>);
    deleteById(id: string): Promise<CompanyUser>;
    create(user: CompanyUser): Promise<CompanyUser>;
    count(where?: Where<CompanyUser>): Promise<Count>;
    findById(userId: string): Promise<CompanyUser>;
    find(filter?: Filter<CompanyUser>): Promise<CompanyUser[]>;
    updateById(id: string, companyUser: CompanyUser): Promise<void>;
    findService(): Promise<CompanyUser[]>;
    findByID(userId: string): Promise<TenderProcess[]>;
    addTenderByUpdate(id: string, TenderingProcessEnteredModel: TenderingProcessEnteredModel): Promise<any>;
}
