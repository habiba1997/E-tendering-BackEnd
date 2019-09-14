import { DefaultCrudRepository } from '@loopback/repository';
import { HospitalUser, HospitalUserRelations } from '../models';
import { ETenderingDatabaseDataSource } from '../datasources';
export declare class HospitalUserRepository extends DefaultCrudRepository<HospitalUser, typeof HospitalUser.prototype._id, HospitalUserRelations> {
    constructor(dataSource: ETenderingDatabaseDataSource);
}
