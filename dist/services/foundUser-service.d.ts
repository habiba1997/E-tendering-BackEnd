import { HospitalUser, CompanyUser } from "../models";
import { Credentials } from '../repositories/credentials-Interface';
import { PasswordHasher } from "./hash.password.bcryptjs";
export declare class foundUser {
    passwordHasher: PasswordHasher;
    constructor(passwordHasher: PasswordHasher);
    createFoundUser(foundUser: (HospitalUser | CompanyUser), credentials: Credentials): Promise<HospitalUser | CompanyUser>;
}
