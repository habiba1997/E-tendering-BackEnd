import { DefaultCrudRepository } from '@loopback/repository';
import { TenderProcess, TenderProcessRelations } from '../models';
import { ETenderingDatabaseDataSource } from '../datasources';
export declare class TenderProcessRepository extends DefaultCrudRepository<TenderProcess, typeof TenderProcess.prototype._id, TenderProcessRelations> {
    constructor(dataSource: ETenderingDatabaseDataSource);
}
