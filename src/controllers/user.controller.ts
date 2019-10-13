
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
  import { HospitalUser, CompanyUser } from '../models';
  import { HospitalUserRepository, CompanyUserRepository, TenderProcessRepository } from '../repositories';
  import { inject } from '@loopback/core';
  import { UserProfile } from '@loopback/security';
  import {
    authenticate,
    AuthenticationBindings,
    TokenService,
    UserService,
  } from '@loopback/authentication';
  import {
    CredentialsRequestBody,
  } from './specs/user-controller.specs'
  import { Credentials } from '../repositories/credentials-Interface';
  
  import {
    TokenServiceBindings,
    UserServiceBindings,
  } from '../keys';
  
  const _ = require('lodash');
  
  
  export class UserController {
    constructor(
      @inject(TokenServiceBindings.TOKEN_SERVICE)
      public jwtService: TokenService,
      @inject(UserServiceBindings.USER_SERVICE)
      public userService: UserService<HospitalUser, Credentials>,
        @repository(HospitalUserRepository)
        public hospitalUserRepository : HospitalUserRepository,
        @repository(CompanyUserRepository)
        public companyUserRepository : CompanyUserRepository,
        @repository(TenderProcessRepository)
        public tenderProcessRepository : TenderProcessRepository,
  
    
    ) { }
  
   
  
    @get('/users/me', {
      responses: {
        '200': {
          description: 'The current user profile',
          content: {
            'application/json': {
              schema: { type: 'array', items: getModelSchemaRef(HospitalUser) },
            },
          },
        },
      },
    })
    @authenticate('jwt')
    async printCurrentUser(
      @inject(AuthenticationBindings.CURRENT_USER)
      currentUserProfile: UserProfile,
    ): Promise<UserProfile> {
      return currentUserProfile;
    }
  
  
  
  
    @post('/users/login', {
      responses: {
        '200': {
          description: 'Token',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    })
    async login(
      @requestBody(CredentialsRequestBody) credentials: Credentials,
    ): Promise<{ token: string }> {
      // ensure the user exists, and the password is correct
      const user = await this.userService.verifyCredentials( credentials);
  
      // convert a User object into a UserProfile object (reduced set of properties)
      const userProfile = this.userService.convertToUserProfile(user);
  
      // create a JSON Web Token based on the user profile
      const token = await this.jwtService.generateToken(userProfile);
  
      return { token };
    }
    
    @del('/All', {
      responses: {
        '204': {
          description: 'DELETE success',
        },
      },
    })
    async delete(): Promise<void> {
      
      let tenders = this.tenderProcessRepository.find();
      (await tenders).forEach(tender => {
        this.tenderProcessRepository.deleteById(tender._id);
        
      });
      let usr = this.companyUserRepository.find();
      (await usr).forEach(user => {
        this.companyUserRepository.deleteById(user._id);
        
      });

      let hosp = this.hospitalUserRepository.find();
      (await hosp).forEach(hospUser => {
        this.hospitalUserRepository.deleteById(hospUser._id);
        
      });


    }




    @del('/tenders', {
      responses: {
        '204': {
          description: 'DELETE success',
        },
      },
    })
    async deleteTenders(): Promise<void> {
      
      let tenders = this.tenderProcessRepository.find();
      (await tenders).forEach(tender => {
        this.tenderProcessRepository.deleteById(tender._id);
        
      });

    }

  
  
  }
  