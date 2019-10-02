import { Entity, model, property, Model } from '@loopback/repository';

@model({ settings: { strict: false } })
export class CompanyUser extends Entity {
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
    default: null,
  })
  specificTenderingProcessesEntered?: string[];
  
  @property({
    type: 'array',
    itemType: 'string',
    default: null,

  })
  TenderingProcessesEntered?: string[];

  @property({
    type: 'array',
    itemType: 'string',
    default: null,

  })
  specificTenderingProcessesAccepted?: string[];
  
  @property({
    type: 'array',
    itemType: 'string',
    default: null,

  })
  TenderingProcessesAccepted?: string[];


  [prop: string]: any;

  constructor(data?: Partial<CompanyUser>) {
    super(data);
  }
}

export interface CompanyUserRelations {
  // describe navigational properties here
}

export type CompanyUserWithRelations = CompanyUser & CompanyUserRelations;
