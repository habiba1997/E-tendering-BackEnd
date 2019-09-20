import { Count, Where } from '@loopback/repository';
import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from '../repositories/credentials-Interface';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
import { CompanyUser, TenderProcess, AcceptObject } from '../models';
import { CompanyUserRepository, TenderProcessRepository } from '../repositories';
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
    find(): Promise<CompanyUser[]>;
    findNameObject(): Promise<CompanyUser[]>;
    updateById(id: string, companyUser: CompanyUser): Promise<void>;
    findService(): Promise<CompanyUser[]>;
    findByID(userId: string): Promise<TenderProcess[]>;
    postAcceptance(obj: AcceptObject): Promise<void>;
    remove(array: string[], removedObject: string): string[];
    updateCompanyWithAcceptedTenderProcess(obj: AcceptObject): Promise<void>;
    directUpdateCompanyWithAcceptedTenderProcess(obj: AcceptObject): Promise<void>;
    deleteTenderIdFromEnteredArray(user: CompanyUser, obj: AcceptObject): Promise<void>;
    deleteTenderIdFromSpecificEnteredArray(user: CompanyUser, obj: AcceptObject): Promise<void>;
}
