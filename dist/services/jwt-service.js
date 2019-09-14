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
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const util_1 = require("util");
const keys_1 = require("../keys");
const jwt = require('jsonwebtoken');
const signAsync = util_1.promisify(jwt.sign);
const verifyAsync = util_1.promisify(jwt.verify);
let JWTService = class JWTService {
    constructor(jwtSecret, jwtExpiresIn) {
        this.jwtSecret = jwtSecret;
        this.jwtExpiresIn = jwtExpiresIn;
    }
    async verifyToken(token) {
        if (!token) {
            throw new rest_1.HttpErrors.Unauthorized(`Error verifying token: 'token' is null`);
        }
        let userProfile;
        try {
            // decode user profile from token
            const decryptedToken = await verifyAsync(token, this.jwtSecret);
            // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
            userProfile = Object.assign({ id: '', name: '' }, { id: decryptedToken.id, name: decryptedToken.name });
        }
        catch (error) {
            throw new rest_1.HttpErrors.Unauthorized(`Error verifying token: ${error.message}`);
        }
        return userProfile;
    }
    async generateToken(userProfile) {
        if (!userProfile) {
            throw new rest_1.HttpErrors.Unauthorized('Error generating token: userProfile is null');
        }
        // Generate a JSON Web Token
        let token;
        try {
            token = await signAsync(userProfile, this.jwtSecret, {
                expiresIn: Number(this.jwtExpiresIn),
            });
        }
        catch (error) {
            throw new rest_1.HttpErrors.Unauthorized(`Error encoding token: ${error}`);
        }
        return token;
    }
};
JWTService = __decorate([
    __param(0, context_1.inject(keys_1.TokenServiceBindings.TOKEN_SECRET)),
    __param(1, context_1.inject(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN)),
    __metadata("design:paramtypes", [String, String])
], JWTService);
exports.JWTService = JWTService;
//# sourceMappingURL=jwt-service.js.map