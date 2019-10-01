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
const diathermy_model_1 = require("./diathermy.model");
let TenderProcess = class TenderProcess extends repository_1.Entity {
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
], TenderProcess.prototype, "_id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], TenderProcess.prototype, "Issued_Hospital_ID", void 0);
__decorate([
    repository_1.property({
        type: 'string',
    }),
    __metadata("design:type", String)
], TenderProcess.prototype, "Hospital_Name", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], TenderProcess.prototype, "Device_Name", void 0);
__decorate([
    repository_1.property({
        type: 'object',
        required: true,
    }),
    __metadata("design:type", diathermy_model_1.Diathermy)
], TenderProcess.prototype, "Device_Data", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], TenderProcess.prototype, "startDate", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    __metadata("design:type", String)
], TenderProcess.prototype, "deadlineDate", void 0);
__decorate([
    repository_1.property({
        type: 'boolean',
        required: true,
    }),
    __metadata("design:type", Boolean)
], TenderProcess.prototype, "Direct_Process", void 0);
__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], TenderProcess.prototype, "Open_Process", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
        required: true,
    }),
    __metadata("design:type", Array)
], TenderProcess.prototype, "Companies_Selected", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
    }),
    __metadata("design:type", Array)
], TenderProcess.prototype, "Companies_Agreed", void 0);
__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'object',
    }),
    __metadata("design:type", Array)
], TenderProcess.prototype, "Agreed", void 0);
TenderProcess = __decorate([
    repository_1.model({ settings: { strict: false } }),
    __metadata("design:paramtypes", [Object])
], TenderProcess);
exports.TenderProcess = TenderProcess;
//# sourceMappingURL=tender-process.model.js.map