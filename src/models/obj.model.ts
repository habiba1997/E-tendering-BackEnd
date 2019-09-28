import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CompaniesSubmittedTenderObject extends Model {
  companyId: string;
  numberOfFits?: number;

  constructor(data?: Partial<CompaniesSubmittedTenderObject>) {
    super(data);
  }
}

export interface ObjRelations {
  // describe navigational properties here
}

export type ObjWithRelations = CompaniesSubmittedTenderObject & ObjRelations;
