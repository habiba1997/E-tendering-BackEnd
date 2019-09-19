import {
  post, param, get, requestBody, HttpErrors,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
} from '@loopback/rest';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import { validateCredentials } from '../services/validator';
import { inject } from '@loopback/core';
import {
  TokenService,
  UserService,
} from '@loopback/authentication';

import { Credentials } from '../repositories/credentials-Interface';
import { PasswordHasher } from '../services/hash.password.bcryptjs';

import {
  TokenServiceBindings,
  PasswordHasherBindings,
  UserServiceBindings,
} from '../keys';

const _ = require('lodash');
import { CompanyUser, TenderProcess, TenderProcessRelations } from '../models';
import { CompanyUserRepository, TenderProcessRepository } from '../repositories';
import { TenderingProcessEnteredModel } from '../models/company-selected.model';

export class CompanyController  {
  
  
  constructor(
    @repository(TenderProcessRepository)
    public tenderProcessRepository : TenderProcessRepository,
    @repository(CompanyUserRepository) public userRepository: CompanyUserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<CompanyUser, Credentials>,
  ) { }

  @del('/company-users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<CompanyUser> {
    let usr = this.userRepository.findById(id, {
      fields: { password: false },
    });
    await this.userRepository.deleteById(id);
    return usr;
  }

  @post('/company-users', {
    responses: {
      '200': {
        description: 'User',
        content: { 'application/json': { schema: getModelSchemaRef(CompanyUser) } },
      },
    },
  })
  async create(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompanyUser),
      },
    },
  })
  user: CompanyUser,
  ): Promise<CompanyUser> {
    // ensure a valid email value and password value
    validateCredentials(_.pick(user, ['email', 'password']));

    // encrypt the password
    // eslint-disable-next-line require-atomic-updates
    user.password = await this.passwordHasher.hashPassword(user.password);

    try {
      // create the new user
      const savedUser = await this.userRepository.create(user);
      delete savedUser.password;

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw new HttpErrors.Conflict('ID is already Taken');
      }
    }
  }

  @get('/company-users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(CompanyUser)) where?: Where<CompanyUser>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }



  @get('/company-users/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': CompanyUser,
            },
          },
        },
      },
    },
  })
  async findById(@param.path.string('userId') userId: string): Promise<CompanyUser> {
    return this.userRepository.findById(userId, {
      fields: { password: false },
    });
  }

 

  @get('/company-users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(CompanyUser) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CompanyUser)) filter?: Filter<CompanyUser>,
  ): Promise<CompanyUser[]> {

    return this.userRepository.find(filter);
  }




  @patch('/company-users/{id}', {
    responses: {
      '204': {
        description: 'HospitalUser PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyUser, { partial: true }),
        },
      },
    })
    companyUser: CompanyUser,
  ): Promise<void> {
    await this.userRepository.updateById(id, companyUser);
  }

  findService(): Promise<CompanyUser[]> {

    return this.userRepository.find();
  }



//get all tender process data objects using userId only
 @get('/company-user-tender/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(TenderProcess) },
          },
        },
      },
    },
  })
  async findByID(@param.path.string('userId') userId: string): Promise<TenderProcess[]> {
    let user = this.userRepository.findById(userId, {
      fields: { password: false },
    });
    let tenderList = (await user).TenderingProcessesEntered;
    
    var tenders =[];
    if(!(tenderList==undefined))
    {
          for(var i =0; i < tenderList.length;++i)
          {
            let tender = await this.tenderProcessRepository.findById(tenderList[i])
            if(!(tender == undefined)) tenders[i]=(tender);
            else throw new HttpErrors.Conflict('tender process undefined');
          }
          
        return tenders;

    }
    else{
      throw new HttpErrors.Conflict('No tender Process');
    }
  }


  @patch('/user-tendersId/{id}', {
    responses: {
      '204': {
        description: 'CompanyUser PATCH success',
      },
    },
  })
  async addTenderByUpdate(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TenderingProcessEnteredModel, { partial: true }),
        },
      },
    })
    TenderingProcessEnteredModel: TenderingProcessEnteredModel,
  ): Promise<any> {
  
    const user = this.userRepository.findById(id, {
      fields: { password: false },
    });
  
    let arr = (await user).TenderingProcessesEntered;
  
    if(!(arr==undefined)) arr.push(TenderingProcessEnteredModel.TenderingProcessEntered);
    (await user).TenderingProcessesEntered = arr;
    await this.userRepository.updateById(id, await user);
  }
  
}
