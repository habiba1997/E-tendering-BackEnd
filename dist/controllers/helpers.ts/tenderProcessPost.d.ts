import { HospitalUserRepository, CompanyUserRepository } from "../../repositories";
import { CompanyUser } from "../../models";
export declare class TenderProcessPostRequest {
    hospitalUserRepository: HospitalUserRepository;
    companyUserRepository: CompanyUserRepository;
    constructor(hospitalUserRepository: HospitalUserRepository, companyUserRepository: CompanyUserRepository);
    addTenderToCompanyByUserID(direct: boolean, Userid: string, TenderProcessId: string): Promise<void>;
    NormaltenderEntered(user: CompanyUser, TenderProcessId: string): Promise<CompanyUser>;
    SpecifictenderEntered(user: CompanyUser, TenderProcessId: string): Promise<CompanyUser>;
    addTenderToHospitalByUserID(Userid: string, TenderProcessId: string): Promise<void>;
}
