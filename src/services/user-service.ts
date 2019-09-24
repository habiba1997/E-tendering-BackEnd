
import { HttpErrors } from '@loopback/rest';
import { HospitalUserRepository } from '../repositories/hospital-user.repository';
import { HospitalUser } from '../models/hospital-user.model';
import { UserService } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { PasswordHasher } from './hash.password.bcryptjs';
import { PasswordHasherBindings } from '../keys';
import { inject } from '@loopback/context';
import { CompanyUser } from '../models';
import { CompanyUserRepository } from '../repositories';
import { Credentials } from '../repositories/credentials-Interface';
import { UserProfile } from '@loopback/security';

export class MyUserService implements UserService<HospitalUser | CompanyUser, Credentials> {


  constructor(
    @repository(CompanyUserRepository) public companyUserRepository: CompanyUserRepository,
    @repository(HospitalUserRepository) public hospitalUserRepository: HospitalUserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) { }
  userRepository: any;

  async verifyCredentials(credentials: Credentials): Promise<CompanyUser | HospitalUser> {
    const invalidCredentialsError = 'Invalid email or password.';
    const bothCompanyAndHospitalUserExist='Such an account Exist in both';
  
    const foundCompanyUser = await this.companyUserRepository.findOne({
        where: { email: credentials.email },
      });
    const foundHospitalUser = await this.hospitalUserRepository.findOne({
        where: { email: credentials.email },
      });
    if ((!foundCompanyUser) && (!foundHospitalUser)) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    else if(foundCompanyUser)
    {      
      

      return this.createFoundUser(foundCompanyUser,credentials);
    }
    else if(foundHospitalUser)
    {
      return this.createFoundUser(foundHospitalUser,credentials);
    }
    else
    {
      throw new HttpErrors.Unauthorized(bothCompanyAndHospitalUserExist);

    }
  
    
  }
  async createFoundUser(foundUser:(HospitalUser | CompanyUser), credentials: Credentials):Promise<HospitalUser | CompanyUser>
  {
    const invalidCredentialsError = 'Invalid email or password.';

    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user:CompanyUser): UserProfile {
    return { id: user._id, email: user.email };
  }
}
