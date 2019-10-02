import { Model } from '@loopback/repository';
export declare class CompaniesSubmittedTenderObject extends Model {
    companyId: string;
    companyName?: string;
    tenderingProcessId: string;
    numberOfFits?: number;
    winner?: boolean;
    [prop: string]: any;
    constructor(data?: Partial<CompaniesSubmittedTenderObject>);
}
export interface ObjRelations {
}
export declare type ObjWithRelations = CompaniesSubmittedTenderObject & ObjRelations;
