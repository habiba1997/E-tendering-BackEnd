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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
"use strict";
const rest_1 = require("@loopback/rest");
const repository_1 = require("@loopback/repository");
const validator_1 = require("../services/validator");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const core_1 = require("@loopback/core");
const authentication_1 = require("@loopback/authentication");
const user_controller_specs_1 = require("./specs/user-controller.specs");
const keys_1 = require("../keys");
const _ = require('lodash');
let HospitalUserController = class HospitalUserController {
    constructor(userRepository, passwordHasher, jwtService, userService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async deleteById(id) {
        let usr = this.userRepository.findById(id, {
            fields: { password: false },
        });
        await this.userRepository.deleteById(id);
        return usr;
    }
    async updateAll(user, where) {
        return this.userRepository.updateAll(user, where);
    }
    async create(user) {
        // ensure a valid email value and password value
        validator_1.validateCredentials(_.pick(user, ['email', 'password']));
        // encrypt the password
        // eslint-disable-next-line require-atomic-updates
        user.password = await this.passwordHasher.hashPassword(user.password);
        try {
            // create the new user
            const savedUser = await this.userRepository.create(user);
            delete savedUser.password;
            return savedUser;
        }
        catch (error) {
            // MongoError 11000 duplicate key
            if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
                throw new rest_1.HttpErrors.Conflict('Email value is already taken');
            }
            else {
                throw new rest_1.HttpErrors.Conflict('ID is already Taken');
            }
        }
    }
    async count(where) {
        return this.userRepository.count(where);
    }
    async findById(userId) {
        return this.userRepository.findById(userId, {
            fields: { password: false },
        });
    }
    async find(filter) {
        return this.userRepository.find(filter);
    }
    async printCurrentUser(currentUserProfile) {
        return currentUserProfile;
    }
    async loginID(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials('hospital', credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    async login(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials('hospital', credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    async updateById(id, hospitalUser) {
        await this.userRepository.updateById(id, hospitalUser);
    }
    async replaceById(id, hospitalUser) {
        await this.userRepository.replaceById(id, hospitalUser);
    }
};
__decorate([
    rest_1.del('/hospital-users/{id}', {
        responses: {
            '204': {
                description: 'User DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HospitalUserController.prototype, "deleteById", null);
__decorate([
    rest_1.patch('/hospital-users', {
        responses: {
            '200': {
                description: 'User PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.HospitalUser, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.HospitalUser))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.HospitalUser, Object]),
    __metadata("design:returntype", Promise)
], HospitalUserController.prototype, "updateAll", null);
__decorate([
    rest_1.post('/hospital-users', {
        responses: {
            '200': {
                description: 'User',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.HospitalUser) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.HospitalUser),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.HospitalUser]),
    __metadata("design:returntype", Promise)
], HospitalUserController.prototype, "create", null);
__decorate([
    rest_1.get('/hospital-users/count', {
        responses: {
            '200': {
                description: 'User model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.HospitalUser))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HospitalUserController.prototype, "count", null);
__decorate([
    rest_1.get('/hospital-users/{userId}', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.HospitalUser,
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.string('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HospitalUserController.prototype, "findById", null);
__decorate([
    rest_1.get('/hospital-users', {
        responses: {
            '200': {
                description: 'Array of User model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.HospitalUser) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.HospitalUser))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HospitalUserController.prototype, "find", null);
__decorate([
    rest_1.get('/hospital-users/me', {
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
    __metadata("design:paramtypes", [typeof (_a = typeof authentication_1.UserProfile !== "undefined" && authentication_1.UserProfile) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], HospitalUserController.prototype, "printCurrentUser", null);
__decorate([
    rest_1.post('/hospital-users/login', {
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
], HospitalUserController.prototype, "loginID", null);
__decorate([
    rest_1.post('/hospital-users/login', {
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
], HospitalUserController.prototype, "login", null);
__decorate([
    rest_1.patch('/hospital-users/{id}', {
        responses: {
            '204': {
                description: 'HospitalUser PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.HospitalUser, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.HospitalUser]),
    __metadata("design:returntype", Promise)
], HospitalUserController.prototype, "updateById", null);
__decorate([
    rest_1.put('/hospital-users/{id}', {
        responses: {
            '204': {
                description: 'HospitalUser PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.HospitalUser]),
    __metadata("design:returntype", Promise)
], HospitalUserController.prototype, "replaceById", null);
HospitalUserController = __decorate([
    __param(0, repository_1.repository(repositories_1.HospitalUserRepository)),
    __param(1, core_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    __param(2, core_1.inject(keys_1.TokenServiceBindings.TOKEN_SERVICE)),
    __param(3, core_1.inject(keys_1.UserServiceBindings.USER_SERVICE)),
    __metadata("design:paramtypes", [repositories_1.HospitalUserRepository, Object, Object, Object])
], HospitalUserController);
exports.HospitalUserController = HospitalUserController;
//# sourceMappingURL=hospital-user.controller.js.map