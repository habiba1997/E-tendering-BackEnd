import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class HospitalUser extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;
  
  @property({
    type: 'array',
    itemType: 'string',
  })
  DevicesToProvide?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  TenderingProcessesCreated?: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<HospitalUser>) {
    super(data);
  }
}

export interface HospitalUserRelations {
  // describe navigational properties here
}

export type HospitalUserWithRelations = HospitalUser & HospitalUserRelations;
