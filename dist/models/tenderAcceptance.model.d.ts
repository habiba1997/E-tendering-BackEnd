import { Model } from '@loopback/repository';
export declare class AcceptObject extends Model {
    CompanyUserId: string;
    TenderingProcessId: string;
    [prop: string]: any;
    constructor(data?: Partial<AcceptObject>);
}
