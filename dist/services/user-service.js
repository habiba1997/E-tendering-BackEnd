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
    constructor(hospitalUserRepository, companyUserRepository, passwordHasher) {
        this.hospitalUserRepository = hospitalUserRepository;
        this.companyUserRepository = companyUserRepository;
        this.passwordHasher = passwordHasher;
    }
    async verifyCredentials(user, credentials) {
        const invalidCredentialsError = 'Invalid email or password.';
        const invalidUseOfFunction = 'Invalid Use of Function';
        if (user === 'hospital')
            this.userRepository = this.hospitalUserRepository;
        else if (user === 'company')
            this.userRepository = this.companyUserRepository;
        else
            throw new rest_1.HttpErrors.Unauthorized(invalidUseOfFunction);
        const foundUser = await this.userRepository.findOne({
            where: { email: credentials.email },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
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
    __param(0, repository_1.repository(hospital_user_repository_1.HospitalUserRepository)),
    __param(1, repository_1.repository(repositories_1.CompanyUserRepository)),
    __param(2, context_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    __metadata("design:paramtypes", [hospital_user_repository_1.HospitalUserRepository,
        repositories_1.CompanyUserRepository, Object])
], MyUserService);
exports.MyUserService = MyUserService;
//# sourceMappingURL=user-service.js.map