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
const repositories_1 = require("../repositories");
const foundUser_service_1 = require("./foundUser-service");
let MyHospitalUserService = class MyHospitalUserService {
    constructor(hospitalUserRepository, foundUserClass) {
        this.hospitalUserRepository = hospitalUserRepository;
        this.foundUserClass = foundUserClass;
    }
    async verifyCredentials(credentials) {
        const invalidCredentialsError = 'Invalid email or password.';
        const foundUser = await this.hospitalUserRepository.findOne({
            where: { email: credentials.email },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        else
            return this.foundUserClass.createFoundUser(foundUser, credentials);
    }
    convertToUserProfile(user) {
        return { id: user._id, email: user.email };
    }
};
MyHospitalUserService = __decorate([
    __param(0, repository_1.repository(repositories_1.HospitalUserRepository)),
    __metadata("design:paramtypes", [repositories_1.HospitalUserRepository,
        foundUser_service_1.foundUser])
], MyHospitalUserService);
exports.MyHospitalUserService = MyHospitalUserService;
//# sourceMappingURL=hospitalUser-service.js.map