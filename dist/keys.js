"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("@loopback/context");
var TokenServiceConstants;
(function (TokenServiceConstants) {
    TokenServiceConstants.TOKEN_SECRET_VALUE = 'myjwts3cr3t';
    TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE = '600';
})(TokenServiceConstants = exports.TokenServiceConstants || (exports.TokenServiceConstants = {}));
var TokenServiceBindings;
(function (TokenServiceBindings) {
    TokenServiceBindings.TOKEN_SECRET = context_1.BindingKey.create('authentication.jwt.secret');
    TokenServiceBindings.TOKEN_EXPIRES_IN = context_1.BindingKey.create('authentication.jwt.expires.in.seconds');
    TokenServiceBindings.TOKEN_SERVICE = context_1.BindingKey.create('services.authentication.jwt.tokenservice');
})(TokenServiceBindings = exports.TokenServiceBindings || (exports.TokenServiceBindings = {}));
var PasswordHasherBindings;
(function (PasswordHasherBindings) {
    PasswordHasherBindings.PASSWORD_HASHER = context_1.BindingKey.create('services.hasher');
    PasswordHasherBindings.ROUNDS = context_1.BindingKey.create('services.hasher.round');
})(PasswordHasherBindings = exports.PasswordHasherBindings || (exports.PasswordHasherBindings = {}));
var UserServiceBindings;
(function (UserServiceBindings) {
    UserServiceBindings.USER_SERVICE = context_1.BindingKey.create('services.user.service');
})(UserServiceBindings = exports.UserServiceBindings || (exports.UserServiceBindings = {}));
//# sourceMappingURL=keys.js.map