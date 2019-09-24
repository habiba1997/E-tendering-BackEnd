import { Model } from '@loopback/repository';
export declare class CompaniesAcceptedTenderObject extends Model {
    companyId: string;
    numberOfFits?: number;
    constructor(data?: Partial<CompaniesAcceptedTenderObject>);
}
export interface ObjRelations {
}
export declare type ObjWithRelations = CompaniesAcceptedTenderObject & ObjRelations;
