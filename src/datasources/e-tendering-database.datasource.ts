import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './e-tendering-database.datasource.json';

export class ETenderingDatabaseDataSource extends juggler.DataSource {
  static dataSourceName = 'eTenderingDatabase';

  
  constructor(
    @inject('datasources.config.eTenderingDatabase', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
