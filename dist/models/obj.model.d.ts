import { Model } from '@loopback/repository';
export declare class CompaniesSubmittedTenderObject extends Model {
    companyId: string;
    numberOfFits?: number;
    constructor(data?: Partial<CompaniesSubmittedTenderObject>);
}
export interface ObjRelations {
}
export declare type ObjWithRelations = CompaniesSubmittedTenderObject & ObjRelations;
