import {Model, model, property} from '@loopback/repository';
import { TenderProcess } from './tender-process.model';

@model({settings: {strict: false}})
export class TenderProcessArray extends Model {
  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  tenders: TenderProcess[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TenderProcessArray>) {
    super(data);
  }
}

export interface TenderProcessArrayRelations {
  // describe navigational properties here
}

export type TenderProcessArrayWithRelations = TenderProcessArray & TenderProcessArrayRelations;
