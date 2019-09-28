import { TenderProcess, CompanyUser, AcceptObject } from '../models';
import { TenderProcessRepository, CompanyUserRepository, HospitalUserRepository } from '../repositories';
import { CompaniesSubmittedTenderObject } from '../models/obj.model';
export declare class TenderProcessController {
    hospitalUserRepository: HospitalUserRepository;
    companyUserRepository: CompanyUserRepository;
    tenderProcessRepository: TenderProcessRepository;
    constructor(hospitalUserRepository: HospitalUserRepository, companyUserRepository: CompanyUserRepository, tenderProcessRepository: TenderProcessRepository);
    addTenderToCompanyByUserID(direct: boolean, Userid: string, TenderProcessId: string): Promise<void>;
    NormaltenderEntered(user: CompanyUser, TenderProcessId: string): Promise<CompanyUser>;
    SpecifictenderEntered(user: CompanyUser, TenderProcessId: string): Promise<CompanyUser>;
    addTenderToHospitalByUserID(Userid: string, TenderProcessId: string): Promise<void>;
    createTender(tenderProcess: TenderProcess): Promise<TenderProcess>;
    find(): Promise<TenderProcess[]>;
    findById(id: string): Promise<TenderProcess>;
    updateById(id: string, tenderProcess: TenderProcess): Promise<void>;
    deleteById(id: string): Promise<void>;
    getAgreedItemNumber(obj: AcceptObject): Promise<CompaniesSubmittedTenderObject[] | undefined>;
}
