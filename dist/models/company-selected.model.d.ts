import { Model } from '@loopback/repository';
export declare class TenderingProcessEnteredModel extends Model {
    TenderingProcessEntered: string;
    [prop: string]: any;
    constructor(data?: Partial<TenderingProcessEnteredModel>);
}
export interface TenderingProcessEnteredModelRelations {
}
export declare type TenderingProcessEnteredModelWithRelations = TenderingProcessEnteredModel & TenderingProcessEnteredModelRelations;
