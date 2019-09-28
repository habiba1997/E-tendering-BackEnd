import { Entity } from '@loopback/repository';
import { CompaniesSubmittedTenderObject } from './obj.model';
import { Diathermy } from './diathermy.model';
export declare class TenderProcess extends Entity {
    _id?: string;
    Issued_Hospital_ID: string;
    Hospital_Name: string;
    Device_Name: string;
    Device_Data: Diathermy;
    startDate: string;
    deadlineDate: string;
    Direct_Process: boolean;
    Open_Process: boolean;
    Companies_Selected: string[];
    Companies_Agreed?: string[];
    Submitted?: CompaniesSubmittedTenderObject[];
    constructor(data?: Partial<TenderProcess>);
}
export interface TenderProcessRelations {
}
export declare type TenderProcessWithRelations = TenderProcess & TenderProcessRelations;
