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
const hospital_user_repository_1 = require("../repositories/hospital-user.repository");
const repository_1 = require("@loopback/repository");
const keys_1 = require("../keys");
const context_1 = require("@loopback/context");
const repositories_1 = require("../repositories");
let MyUserService = class MyUserService {
    constructor(companyUserRepository, hospitalUserRepository, passwordHasher) {
        this.companyUserRepository = companyUserRepository;
        this.hospitalUserRepository = hospitalUserRepository;
        this.passwordHasher = passwordHasher;
    }
    async verifyCredentials(credentials) {
        const invalidCredentialsError = 'Invalid email or password.';
        const bothCompanyAndHospitalUserExist = 'Such an account Exist in both';
        const foundCompanyUser = await this.companyUserRepository.findOne({
            where: { email: credentials.email },
        });
        const foundHospitalUser = await this.hospitalUserRepository.findOne({
            where: { email: credentials.email },
        });
        if ((!foundCompanyUser) && (!foundHospitalUser)) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        else if (foundCompanyUser) {
            return this.createFoundUser(foundCompanyUser, credentials);
        }
        else if (foundHospitalUser) {
            return this.createFoundUser(foundHospitalUser, credentials);
        }
        else {
            throw new rest_1.HttpErrors.Unauthorized(bothCompanyAndHospitalUserExist);
        }
    }
    async createFoundUser(foundUser, credentials) {
        const invalidCredentialsError = 'Invalid email or password.';
        const passwordMatched = await this.passwordHasher.comparePassword(credentials.password, foundUser.password);
        if (!passwordMatched) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        return foundUser;
    }
    convertToUserProfile(user) {
        return { id: user._id, email: user.email };
    }
};
MyUserService = __decorate([
    __param(0, repository_1.repository(repositories_1.CompanyUserRepository)),
    __param(1, repository_1.repository(hospital_user_repository_1.HospitalUserRepository)),
    __param(2, context_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    __metadata("design:paramtypes", [repositories_1.CompanyUserRepository,
        hospital_user_repository_1.HospitalUserRepository, Object])
], MyUserService);
exports.MyUserService = MyUserService;
//# sourceMappingURL=user-service.js.map