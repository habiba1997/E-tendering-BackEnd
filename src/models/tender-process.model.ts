import {Entity, model, property} from '@loopback/repository';
import { CompaniesSubmittedTenderObject } from './obj.model';
import { Diathermy } from './diathermy.model';

@model({settings: {strict: false}})
export class TenderProcess extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  _id?: string;
  
  @property({
    type: 'string',
    required: true,
  })
  Issued_Hospital_ID: string;

  @property({
    type: 'string',
  })
  Hospital_Name: string;


  @property({
    type: 'string',
    required: true,
  })
  Device_Name: string;


  @property({
    type: 'object',
    required: true,
  })
  Device_Data: Diathermy;
  
  @property({
    type: 'string',
    required: true,
  })
  startDate: string;
  
  @property({
    type: 'string',
    required: true,
  })
  deadlineDate: string;


  @property({
    type: 'boolean',
    required: true,
  })
  Direct_Process: boolean;


  @property({
    type: 'boolean',
  })
  Open_Process: boolean;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  Companies_Selected: string[];


  @property({
    type: 'array',
    itemType: 'string',
  })
  Companies_Agreed?: string[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  Agreed?: CompaniesSubmittedTenderObject[];

  constructor(data?: Partial<TenderProcess>) {
    super(data);
  }
}


export interface TenderProcessRelations {
  // describe navigational properties here
}

export type TenderProcessWithRelations = TenderProcess & TenderProcessRelations;
