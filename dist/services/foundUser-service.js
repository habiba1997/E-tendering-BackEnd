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
const context_1 = require("@loopback/context");
const keys_1 = require("../keys");
let foundUser = class foundUser {
    constructor(passwordHasher) {
        this.passwordHasher = passwordHasher;
    }
    async createFoundUser(foundUser, credentials) {
        const invalidCredentialsError = 'Invalid email or password.';
        const passwordMatched = await this.passwordHasher.comparePassword(credentials.password, foundUser.password);
        if (!passwordMatched) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        return foundUser;
    }
};
foundUser = __decorate([
    __param(0, context_1.inject(keys_1.PasswordHasherBindings.PASSWORD_HASHER)),
    __metadata("design:paramtypes", [Object])
], foundUser);
exports.foundUser = foundUser;
//# sourceMappingURL=foundUser-service.js.map