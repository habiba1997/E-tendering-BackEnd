import { Model } from '@loopback/repository';
import { TenderProcess } from './tender-process.model';
export declare class TenderProcessArray extends Model {
    tenders: TenderProcess[];
    [prop: string]: any;
    constructor(data?: Partial<TenderProcessArray>);
}
export interface TenderProcessArrayRelations {
}
export declare type TenderProcessArrayWithRelations = TenderProcessArray & TenderProcessArrayRelations;
