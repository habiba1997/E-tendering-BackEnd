import { Entity } from '@loopback/repository';
export declare class HospitalUser extends Entity {
    _id?: string;
    name: string;
    email: string;
    password: string;
    [prop: string]: any;
    constructor(data?: Partial<HospitalUser>);
}
export interface HospitalUserRelations {
}
export declare type HospitalUserWithRelations = HospitalUser & HospitalUserRelations;
