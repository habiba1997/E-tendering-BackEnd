import { Model } from '@loopback/repository';
export declare class TenderArray extends Model {
    tenderArray: string[];
    [prop: string]: any;
    constructor(data?: Partial<TenderArray>);
}
export interface TenderArrayRelations {
}
export declare type TenderArrayWithRelations = TenderArray & TenderArrayRelations;
