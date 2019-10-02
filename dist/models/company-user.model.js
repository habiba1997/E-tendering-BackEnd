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
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
let CompanyUser = class CompanyUser extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'string',
        id: true,
    }),
    __metadata("design:type", String)
], CompanyUser.prototype, "_id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], CompanyUser.prototype, "name", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], CompanyUser.prototype, "email", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], CompanyUser.prototype, "password", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
        default: null,
    }),
    __metadata("design:type", Array)
], CompanyUser.prototype, "specificTenderingProcessesEntered", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
        default: null,
    }),
    __metadata("design:type", Array)
], CompanyUser.prototype, "TenderingProcessesEntered", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
        default: null,
    }),
    __metadata("design:type", Array)
], CompanyUser.prototype, "specificTenderingProcessesAccepted", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
        default: null,
    }),
    __metadata("design:type", Array)
], CompanyUser.prototype, "TenderingProcessesAccepted", void 0);
CompanyUser = __decorate([
    repository_1.model({ settings: { strict: false } }),
    __metadata("design:paramtypes", [Object])
], CompanyUser);
exports.CompanyUser = CompanyUser;
//# sourceMappingURL=company-user.model.js.map