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
const validator_1 = require("../services/validator");
const core_1 = require("@loopback/core");
const keys_1 = require("../keys");
const _ = require('lodash');
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const company_selected_model_1 = require("../models/company-selected.model");
let CompanyController = class CompanyController {
    constructor(tenderProcessRepository, userRepository, passwordHasher, jwtService, userService) {
        this.tenderProcessRepository = tenderProcessRepository;
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
    async updateById(id, companyUser) {
        await this.userRepository.updateById(id, companyUser);
    }
    findService() {
        return this.userRepository.find();
    }
    //get all tender process data objects using userId only
    async findByID(userId) {
        let user = this.userRepository.findById(userId, {
            fields: { password: false },
        });
        let tenderList = (await user).TenderingProcessesEntered;
        var tenders = [];
        if (!(tenderList == undefined)) {
            for (var i = 0; i < tenderList.length; ++i) {
                let tender = await this.tenderProcessRepository.findById(tenderList[i]);
                if (!(tender == undefined))
                    tenders[i] = (tender);
                else
                    throw new rest_1.HttpErrors.Conflict('tender process undefined');
            }
            return tenders;
        }
        else {
            throw new rest_1.HttpErrors.Conflict('No tender Process');
        }
    }
    async addTenderByUpdate(id, TenderingProcessEnteredModel) {
        const user = this.userRepository.findById(id, {
            fields: { password: false },
        });
        let arr = (await user).TenderingProcessesEntered;
        if (!(arr == undefined))
            arr.push(TenderingProcessEnteredModel.TenderingProcessEntered);
        (await user).TenderingProcessesEntered = arr;
        await this.userRepository.updateById(id, await user);
    }
};
__decorate([
    rest_1.del('/company-users/{id}', {
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
], CompanyController.prototype, "deleteById", null);
__decorate([
    rest_1.post('/company-users', {
        responses: {
            '200': {
                description: 'User',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.CompanyUser) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.CompanyUser),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.CompanyUser]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "create", null);
__decorate([
    rest_1.get('/company-users/count', {
        responses: {
            '200': {
                description: 'User model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.CompanyUser))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "count", null);
__decorate([
    rest_1.get('/company-users/{userId}', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.CompanyUser,
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
], CompanyController.prototype, "findById", null);
__decorate([
    rest_1.get('/company-users', {
        responses: {
            '200': {
                description: 'Array of User model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.CompanyUser) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.CompanyUser))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "find", null);
__decorate([
    rest_1.patch('/company-users/{id}', {
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
                schema: rest_1.getModelSchemaRef(models_1.CompanyUser, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.CompanyUser]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "updateById", null);
__decorate([
    rest_1.get('/company-user-tender/{userId}', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.TenderProcess) },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.string('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findByID", null);
__decorate([
    rest_1.patch('/user-tendersId/{id}', {
        responses: {
            '204': {
                description: 'CompanyUser PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(company_selected_model_1.TenderingProcessEnteredModel, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, company_selected_model_1.TenderingProcessEnteredModel]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "addTenderByUpdate", null);
CompanyController = __decorate([
    __param(0, repository_1.repository(repositories_1.TenderProcessRepository)),
    __param(1, repository_1.repository(repositories_1.CompanyUserRepository)),
    __param(2, core_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    __param(3, core_1.inject(keys_1.TokenServiceBindings.TOKEN_SERVICE)),
    __param(4, core_1.inject(keys_1.UserServiceBindings.USER_SERVICE)),
    __metadata("design:paramtypes", [repositories_1.TenderProcessRepository,
        repositories_1.CompanyUserRepository, Object, Object, Object])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map