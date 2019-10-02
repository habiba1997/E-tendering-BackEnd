import {
  post, param, get, requestBody, HttpErrors,
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
import { CompanyUser, TenderProcess } from '../models';
import { CompanyUserRepository, TenderProcessRepository } from '../repositories';
import { CompaniesSubmittedTenderObject } from '../models/obj.model';

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
    let usr = this.userRepository.findById(id);
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
  async find(): Promise<CompanyUser[]> {

    return this.userRepository.find();
  }
  
  
  @get('/company-users-names', {
    responses: {
      '200': {
        description: 'Array of company user model instances',
      },
    },
  })
  async findNameObject(): Promise<CompanyUser[]> {
    const users = this.userRepository.find();
    var i =0;
    (await users).forEach(async user => {
      (await users)[i] = _.pick(user, ['_id', 'name']);
      i=i+1;
    });
    return users;

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





  @post('/company-reject', {
    responses: {
      '200': {
        description: 'User',
        content: { 'application/json': { schema: getModelSchemaRef(CompanyUser) } },
      },
    },
  })
  async postReject(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompaniesSubmittedTenderObject),
      },
    },
  })
  obj: CompaniesSubmittedTenderObject,
  ): Promise<void> {
    //update tender process with accepted company Id
    let tender = this.tenderProcessRepository.findById(obj.tenderingProcessId);
    let user = this.userRepository.findById(obj.companyId);
    
    if((await tender).Direct_Process) this.deleteTenderIdFromSpecificEnteredArray(await user,obj)
    else this.deleteTenderIdFromEnteredArray(await user,obj);
  }

  @post('/company-submit', {
    responses: {
      '200': {
        description: 'User Submitted'
      },
    },
  })
  async submit(
  @requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompaniesSubmittedTenderObject),
      },
    },
  })
  obj: CompaniesSubmittedTenderObject,
  ): Promise<TenderProcess > {



    const user = await this.userRepository.findById(obj.companyId);

    let tender = await this.tenderProcessRepository.findById(obj.tenderingProcessId);

    let array = tender.Agreed;
    if (array)
    {
       array.forEach(element => {
        if (element.companyId == user._id)
        {
          throw new HttpErrors.Conflict("Can't Add What Already Exist");
        }

    });
    
    }
   
    
    var companyName = await this.postAcceptance(user,obj,tender);

    obj.winner = false;
    obj.companyName = companyName;

    let agreed = tender.Agreed;
    if(agreed)
    {
      agreed.push(obj);
    }
    else
    {
      var arr =[];
      arr.push(obj);
      agreed = arr;
    }
    tender.Agreed= agreed;    
    
    this.tenderProcessRepository.updateById(obj.tenderingProcessId, tender);
    return this.tenderProcessRepository.findById(obj.tenderingProcessId);

  }




  async postAcceptance(user: CompanyUser,obj:CompaniesSubmittedTenderObject, tender:TenderProcess ): Promise<string> {
    //update tender process with accepted company Id
    var arr = (await tender).Companies_Agreed;
    if(!(arr==undefined)) 
    {
      arr.push(obj.companyId);
      (await tender).Companies_Agreed = arr;
    }
    else
    {
      var array=[];
      array.push(obj.companyId);
      (await tender).Companies_Agreed = array;
    }
    this.tenderProcessRepository.updateById(obj.tenderingProcessId, await tender);
    let companyName;

    if((await tender).Direct_Process) 
    {
      companyName =this.directUpdateCompanyWithAcceptedTenderProcess(user, obj);
    
    }

    else 
    {
      companyName = this.updateCompanyWithAcceptedTenderProcess(user, obj);
    }
    
    return companyName;

  }

  remove(array:string[],removedObject:string):string[]
  {
    var pos = array.indexOf(removedObject);
    // Remove an item by index position
    var removedItem = array.splice(pos, 1);
    return array;
  }

  async updateCompanyWithAcceptedTenderProcess(user: CompanyUser, obj:CompaniesSubmittedTenderObject)
    {
        var arr = ( user).TenderingProcessesAccepted;
        if(!(arr==undefined)) 
        {
          arr.push(obj.tenderingProcessId);
          ( user).TenderingProcessesAccepted = arr;
        }
        else{
          var array=[];
          array.push(obj.tenderingProcessId);
          ( user).TenderingProcessesAccepted = array;
        }
        this.deleteTenderIdFromEnteredArray(user,obj);
        return user.name;

    } 
    async directUpdateCompanyWithAcceptedTenderProcess(user: CompanyUser,obj:CompaniesSubmittedTenderObject)
    {
        var arr = (user).specificTenderingProcessesAccepted;
        if(!(arr==undefined)) 
        {
          arr.push(obj.tenderingProcessId);
          (user).specificTenderingProcessesAccepted = arr;
        }
        else{
          var array=[];
          array.push(obj.tenderingProcessId);
          (user).specificTenderingProcessesAccepted = array;
        }
        this.deleteTenderIdFromSpecificEnteredArray(user,obj)
        return user.name;
    } 
 
  async deleteTenderIdFromEnteredArray(user: CompanyUser,obj:CompaniesSubmittedTenderObject)
  {
      let arr = user.TenderingProcessesEntered
      if(!(arr==undefined))  arr = this.remove(arr,obj.tenderingProcessId);
      else  throw new HttpErrors.Conflict('delete problem');

      (await user).TenderingProcessesEntered = arr;

      this.userRepository.updateById(obj.companyId, await user);

  } 
  
  async deleteTenderIdFromSpecificEnteredArray(user: CompanyUser,obj:CompaniesSubmittedTenderObject)
  {
      let arr = (await user).specificTenderingProcessesEntered
      if(!(arr==undefined))  arr = this.remove(arr,obj.tenderingProcessId);
      else  throw new HttpErrors.Conflict('delete problem');
      (await user).specificTenderingProcessesEntered = arr;

      this.userRepository.updateById(obj.companyId, await user);

  }   
/*

  @patch('/user-tenders/{id}', {
    responses: {
      '204': {
        description: 'CompanyUser PATCH success',
      },
    },
  })
  async addTenderByUpdate(
    @param.path.string('id') id: string,
   ){
  
    const user = this.userRepository.findById(id, {
      fields: { password: false },
    });
  
    let arr = (await user).TenderingProcessesEntered;
    let directArr = (await user).specificTenderingProcessesEntered;

    let tenders =[];

    if(arr)
      {

      if(directArr) arr.concat(directArr);
      
        arr.forEach(element => {
        tenders.push(this.tenderProcessRepository.findById(element));

      });
      
    
      }
    
    return tenders;
  }*/
  
}
