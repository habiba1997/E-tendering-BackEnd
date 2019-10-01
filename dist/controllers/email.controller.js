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
const nodemailer = require('nodemailer');
const nodemailerMailGun = require('nodemailer-mailgun-transport');
class EmailController {
    async sendMail(userEmail) {
        const auth = {
            auth: {
                api_key: '3cec832c45b1c35bd9fb1b42a4f8a4ee-af6c0cec-5194ab9b',
                domain: 'sandbox07ab5c3c39014eee89cac7d780175217.mailgun.org'
            }
        };
        let transporter = nodemailer.createTransport(nodemailerMailGun(auth));
        const mailOptions = {
            from: 'Meet <MEET@E-Tendering.mail.org>',
            to: userEmail,
            subject: "Testmail",
            html: '<p>This is a mail</p>'
        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error: ' + err);
            }
            else {
                console.log('Message Sent!!!!');
            }
        });
    }
}
__decorate([
    rest_1.post('/sendEmail/{userEmail}', {
        responses: {
            '200': {
                description: 'Email Successfully Sent',
            },
        },
    }),
    __param(0, rest_1.param.path.string('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendMail", null);
exports.EmailController = EmailController;
//# sourceMappingURL=email.controller.js.map