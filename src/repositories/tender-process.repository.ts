import {DefaultCrudRepository} from '@loopback/repository';
import {TenderProcess, TenderProcessRelations} from '../models';
import {ETenderingDatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TenderProcessRepository extends DefaultCrudRepository<
  TenderProcess,
  typeof TenderProcess.prototype._id,
  TenderProcessRelations
> {
  constructor(
    @inject('datasources.eTenderingDatabase') dataSource: ETenderingDatabaseDataSource,
  ) {
    super(TenderProcess, dataSource);
  }
}
