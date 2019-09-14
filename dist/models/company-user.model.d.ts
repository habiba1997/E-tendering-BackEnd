import { Entity } from '@loopback/repository';
export declare class CompanyUser extends Entity {
    _id?: string;
    name: string;
    email: string;
    password: string;
    [prop: string]: any;
    constructor(data?: Partial<CompanyUser>);
}
export interface CompanyUserRelations {
}
export declare type CompanyUserWithRelations = CompanyUser & CompanyUserRelations;
