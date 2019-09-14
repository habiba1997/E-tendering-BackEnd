import { DefaultCrudRepository } from '@loopback/repository';
import { CompanyUser, CompanyUserRelations } from '../models';
import { ETenderingDatabaseDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class CompanyUserRepository extends DefaultCrudRepository<
  CompanyUser,
  typeof CompanyUser.prototype._id,
  CompanyUserRelations
  > {
  constructor(
    @inject('datasources.eTenderingDatabase') dataSource: ETenderingDatabaseDataSource,
  ) {
    super(CompanyUser, dataSource);
  }
}
