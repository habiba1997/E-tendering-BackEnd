import { Model } from '@loopback/repository';
export declare class Diathermy extends Model {
    countryOfOrigin: string;
    polarity: string;
    compatibility: string;
    alarm: string;
    powerRange: number;
    CogPowerRange: number;
    FDACertified: boolean;
    [prop: string]: any;
    constructor(data?: Partial<Diathermy>);
}
export interface DiathermyRelations {
}
export declare type DiathermyWithRelations = Diathermy & DiathermyRelations;
