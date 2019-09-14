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
const authentication_1 = require("@loopback/authentication");
const SequenceActions = rest_1.RestBindings.SequenceActions;
let MyAuthenticationSequence = class MyAuthenticationSequence {
    constructor(findRoute, parseParams, invoke, send, reject, authenticateRequest) {
        this.findRoute = findRoute;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
        this.authenticateRequest = authenticateRequest;
    }
    async handle(context) {
        try {
            const { request, response } = context;
            const route = this.findRoute(request);
            //call authentication action
            await this.authenticateRequest(request);
            // Authentication successful, proceed to invoke controller
            const args = await this.parseParams(request, route);
            const result = await this.invoke(route, args);
            this.send(response, result);
        }
        catch (error) {
            if (error.code === authentication_1.AUTHENTICATION_STRATEGY_NOT_FOUND ||
                error.code === authentication_1.USER_PROFILE_NOT_FOUND) {
                Object.assign(error, { statusCode: 401 /* Unauthorized */ });
            }
            this.reject(context, error);
        }
    }
};
MyAuthenticationSequence = __decorate([
    __param(0, context_1.inject(SequenceActions.FIND_ROUTE)),
    __param(1, context_1.inject(SequenceActions.PARSE_PARAMS)),
    __param(2, context_1.inject(SequenceActions.INVOKE_METHOD)),
    __param(3, context_1.inject(SequenceActions.SEND)),
    __param(4, context_1.inject(SequenceActions.REJECT)),
    __param(5, context_1.inject(authentication_1.AuthenticationBindings.AUTH_ACTION)),
    __metadata("design:paramtypes", [Function, Function, Function, Function, Function, Function])
], MyAuthenticationSequence);
exports.MyAuthenticationSequence = MyAuthenticationSequence;
//# sourceMappingURL=sequence.js.map