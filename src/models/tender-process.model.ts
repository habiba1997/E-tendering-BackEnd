import {Entity, model, property} from '@loopback/repository';

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
    required: true,
  })
  Device_Name: string;


  @property({
    type: 'string',
    required: true,
  })
  CountryOfOrigin: string;


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


  constructor(data?: Partial<TenderProcess>) {
    super(data);
  }
}


export interface TenderProcessRelations {
  // describe navigational properties here
}

export type TenderProcessWithRelations = TenderProcess & TenderProcessRelations;
