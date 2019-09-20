import { model, property, Model } from '@loopback/repository';

@model({ settings: { strict: false } })
export class AcceptObject extends Model {
 

  @property({
    type: 'string',
    required: true,
  })  
  CompanyUserId: string;

  @property({
    type: 'string',
    required: true,
  })  
  TenderingProcessId: string;


  [prop: string]: any;

  constructor(data?: Partial<AcceptObject>) {
    super(data);
  }
}


