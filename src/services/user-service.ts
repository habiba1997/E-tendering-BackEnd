
import { HttpErrors } from '@loopback/rest';
import { HospitalUserRepository } from '../repositories/hospital-user.repository';
import { HospitalUser } from '../models/hospital-user.model';
import { UserService, UserProfile } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { PasswordHasher } from './hash.password.bcryptjs';
import { PasswordHasherBindings } from '../keys';
import { inject } from '@loopback/context';
import { CompanyUser } from '../models';
import { CompanyUserRepository } from '../repositories';
import { Credentials } from '../repositories/credentials-Interface';

export class MyUserService implements UserService<HospitalUser | CompanyUser, Credentials> {


  constructor(
    @repository(HospitalUserRepository) public hospitalUserRepository: HospitalUserRepository,
    @repository(CompanyUserRepository) public companyUserRepository: CompanyUserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) { }
  userRepository: any;

  async verifyCredentials(user: string, credentials: Credentials): Promise<HospitalUser | CompanyUser> {
    const invalidCredentialsError = 'Invalid email or password.';
    const invalidUseOfFunction = 'Invalid Use of Function'

    if (user === 'hospital') this.userRepository = this.hospitalUserRepository;
    else if (user === 'company') this.userRepository = this.companyUserRepository;
    else throw new HttpErrors.Unauthorized(invalidUseOfFunction);


    const foundUser = await this.userRepository.findOne({
      where: { email: credentials.email },
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: (HospitalUser | CompanyUser)): UserProfile {
    return { id: user._id, email: user.email };
  }
}
