import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class TenderArray extends Model {
  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  tenderArray: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TenderArray>) {
    super(data);
  }
}

export interface TenderArrayRelations {
  // describe navigational properties here
}

export type TenderArrayWithRelations = TenderArray & TenderArrayRelations;
