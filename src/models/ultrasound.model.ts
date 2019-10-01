import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Ultrasound extends Model {
  @property({
    type: 'string',
    required: true,
  })
  countryOfOrigin: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  PhysicalandErgonomicFeatures: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  ScanModes: string[];

  @property({
    type: 'string',
    required: true,
  })
  probs: string;

  @property({
    type: 'boolean',
    required: true,
  })
  FDACertified: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ultrasound>) {
    super(data);
  }
}

export interface UltrasoundRelations {
  // describe navigational properties here
}

export type UltrasoundWithRelations = Ultrasound & UltrasoundRelations;
