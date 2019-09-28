import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})

export class Diathermy extends Model {
  @property({
    type: 'string',
    required: true,
  })
  countryOfOrigin: string;

  @property({
    type: 'string',
    required: true,
  })
  polarity: string;

  @property({
    type: 'string',
    required: true,
    default: "Open",
  })
  compatibility: string;

  @property({
    type: 'string',
    required: true,
  })
  alarm: string;

  @property({
    type: 'number',
    required: true,
  })
  powerRange: number;

  @property({
    type: 'number',
    required: true,
  })
  CogPowerRange: number;

  @property({
    type: 'boolean',
    required: true,
  })
  FDACertified: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Diathermy>) {
    super(data);
  }
}

export interface DiathermyRelations {
  // describe navigational properties here
}

export type DiathermyWithRelations = Diathermy & DiathermyRelations;
