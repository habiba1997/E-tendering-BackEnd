"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const isemail = require("isemail");
const rest_1 = require("@loopback/rest");
function validateCredentials(credentials) {
    // Validate Email
    if (!isemail.validate(credentials.email)) {
        throw new rest_1.HttpErrors.UnprocessableEntity('invalid email');
    }
    // Validate Password Length
    if (credentials.password.length < 8) {
        throw new rest_1.HttpErrors.UnprocessableEntity('password must be minimum 8 characters');
    }
}
exports.validateCredentials = validateCredentials;
//# sourceMappingURL=validator.js.map