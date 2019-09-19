import { model, property, Model } from '@loopback/repository';

@model({ settings: { strict: false } })
export class TenderingProcessEnteredModel extends Model {
 

  @property({
    type: 'string',
    required: true,
  })  
  TenderingProcessEntered: string;


  [prop: string]: any;

  constructor(data?: Partial<TenderingProcessEnteredModel>) {
    super(data);
  }
}

export interface TenderingProcessEnteredModelRelations {
  // describe navigational properties here
}

export type TenderingProcessEnteredModelWithRelations = TenderingProcessEnteredModel & TenderingProcessEnteredModelRelations;
