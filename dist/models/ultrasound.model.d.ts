import { Model } from '@loopback/repository';
export declare class Ultrasound extends Model {
    countryOfOrigin: string;
    PhysicalandErgonomicFeatures: string[];
    ScanModes: string[];
    probs: string;
    FDA: boolean;
    [prop: string]: any;
    constructor(data?: Partial<Ultrasound>);
}
export interface UltrasoundRelations {
}
export declare type UltrasoundWithRelations = Ultrasound & UltrasoundRelations;
