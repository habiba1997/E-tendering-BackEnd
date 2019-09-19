import { CompanyUser } from "../models";
export interface ControllerService {
    findService(): Promise<CompanyUser[]>;
}
