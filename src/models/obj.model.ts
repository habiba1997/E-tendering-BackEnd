import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CompaniesSubmittedTenderObject extends Model {
  
  @property({
    type: 'string',
    required: true,
  })  
  companyId: string;
  
  @property({
    type: 'string',
  })  
  companyName?: string;

  @property({
    type: 'string',
    required: true,
  })  
  tenderingProcessId: string;

  @property({
    type: 'number',
  })  
  numberOfFits?: number;

  @property({
    type: 'boolean',
    default: false,
  })
  winner?: boolean;

  [prop: string]: any;

  constructor(data?: Partial<CompaniesSubmittedTenderObject>) {
    super(data);
  }
}

export interface ObjRelations {
  // describe navigational properties here
}

export type ObjWithRelations = CompaniesSubmittedTenderObject & ObjRelations;
