import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CompaniesAcceptedTenderObject extends Model {
  companyId: string;
  numberOfFits?: number;

  constructor(data?: Partial<CompaniesAcceptedTenderObject>) {
    super(data);
  }
}

export interface ObjRelations {
  // describe navigational properties here
}

export type ObjWithRelations = CompaniesAcceptedTenderObject & ObjRelations;
