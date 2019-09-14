import { DefaultCrudRepository } from '@loopback/repository';
import { CompanyUser, CompanyUserRelations } from '../models';
import { ETenderingDatabaseDataSource } from '../datasources';
export declare class CompanyUserRepository extends DefaultCrudRepository<CompanyUser, typeof CompanyUser.prototype._id, CompanyUserRelations> {
    constructor(dataSource: ETenderingDatabaseDataSource);
}
