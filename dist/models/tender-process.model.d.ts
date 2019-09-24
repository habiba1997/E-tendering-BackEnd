import { Entity } from '@loopback/repository';
import { CompaniesAcceptedTenderObject } from './obj.model';
export declare class TenderProcess extends Entity {
    _id?: string;
    Issued_Hospital_ID: string;
    Hospital_Name: string;
    Device_Name: string;
    CountryOfOrigin: string;
    startDate: Date;
    deadlineDate: string;
    Direct_Process: boolean;
    Open_Process: boolean;
    Companies_Selected: string[];
    Companies_Agreed?: string[];
    Agreed?: CompaniesAcceptedTenderObject[];
    constructor(data?: Partial<TenderProcess>);
}
export interface TenderProcessRelations {
}
export declare type TenderProcessWithRelations = TenderProcess & TenderProcessRelations;
