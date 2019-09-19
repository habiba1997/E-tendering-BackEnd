import { Entity } from '@loopback/repository';
export declare class TenderProcess extends Entity {
    _id?: string;
    Issued_Hospital_ID: string;
    Device_Name: string;
    CountryOfOrigin: string;
    Direct_Process: boolean;
    Open_Process: boolean;
    Companies_Selected: string[];
    Companies_Agreed?: string[];
    constructor(data?: Partial<TenderProcess>);
}
export interface TenderProcessRelations {
}
export declare type TenderProcessWithRelations = TenderProcess & TenderProcessRelations;
