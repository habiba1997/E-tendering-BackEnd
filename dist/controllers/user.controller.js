"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const core_1 = require("@loopback/core");
const authentication_1 = require("@loopback/authentication");
const user_controller_specs_1 = require("./specs/user-controller.specs");
const keys_1 = require("../keys");
const _ = require('lodash');
let UserController = class UserController {
    constructor(jwtService, userService, hospitalUserRepository, companyUserRepository, tenderProcessRepository) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.hospitalUserRepository = hospitalUserRepository;
        this.companyUserRepository = companyUserRepository;
        this.tenderProcessRepository = tenderProcessRepository;
    }
    async printCurrentUser(currentUserProfile) {
        return currentUserProfile;
    }
    async login(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    async delete() {
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
};
__decorate([
    rest_1.get('/users/me', {
        responses: {
            '200': {
                description: 'The current user profile',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.HospitalUser) },
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    __param(0, core_1.inject(authentication_1.AuthenticationBindings.CURRENT_USER)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "printCurrentUser", null);
__decorate([
    rest_1.post('/users/login', {
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
    }),
    __param(0, rest_1.requestBody(user_controller_specs_1.CredentialsRequestBody)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    rest_1.del('/All', {
        responses: {
            '204': {
                description: 'DELETE success',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    __param(0, core_1.inject(keys_1.TokenServiceBindings.TOKEN_SERVICE)),
    __param(1, core_1.inject(keys_1.UserServiceBindings.USER_SERVICE)),
    __param(2, repository_1.repository(repositories_1.HospitalUserRepository)),
    __param(3, repository_1.repository(repositories_1.CompanyUserRepository)),
    __param(4, repository_1.repository(repositories_1.TenderProcessRepository)),
    __metadata("design:paramtypes", [Object, Object, repositories_1.HospitalUserRepository,
        repositories_1.CompanyUserRepository,
        repositories_1.TenderProcessRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map