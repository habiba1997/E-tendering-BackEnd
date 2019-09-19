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
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../../repositories");
let TenderProcessPostRequest = class TenderProcessPostRequest {
    constructor(hospitalUserRepository, companyUserRepository) {
        this.hospitalUserRepository = hospitalUserRepository;
        this.companyUserRepository = companyUserRepository;
    }
    //add tender process to user 
    async addTenderToCompanyByUserID(direct, Userid, TenderProcessId) {
        let user = this.companyUserRepository.findById(Userid, {
            fields: { password: false },
        });
        if (direct) {
            user = this.SpecifictenderEntered(await user, TenderProcessId);
        }
        else {
            user = this.NormaltenderEntered(await user, TenderProcessId);
        }
        await this.companyUserRepository.updateById(Userid, await user);
    }
    async NormaltenderEntered(user, TenderProcessId) {
        let arr = (await user).TenderingProcessesEntered;
        if (!(arr == undefined)) {
            arr.push(TenderProcessId);
            (await user).TenderingProcessesEntered = arr;
        }
        else {
            var array = [];
            array.push(TenderProcessId);
            (await user).TenderingProcessesEntered = array;
        }
        return user;
    }
    async SpecifictenderEntered(user, TenderProcessId) {
        let arr = (await user).specificTenderingProcessesEntered;
        if (!(arr == undefined)) {
            arr.push(TenderProcessId);
            (await user).specificTenderingProcessesEntered = arr;
        }
        else {
            var array = [];
            array.push(TenderProcessId);
            (await user).specificTenderingProcessesEntered = array;
        }
        return user;
    }
    async addTenderToHospitalByUserID(Userid, TenderProcessId) {
        const user = this.hospitalUserRepository.findById(Userid, {
            fields: { password: false },
        });
        let arr = (await user).TenderingProcessesCreated;
        if (!(arr == undefined)) {
            arr.push(TenderProcessId);
            (await user).TenderingProcessesCreated = arr;
        }
        else {
            var array = [];
            array.push(TenderProcessId);
            (await user).TenderingProcessesCreated = array;
        }
        await this.hospitalUserRepository.updateById(Userid, await user);
    }
};
TenderProcessPostRequest = __decorate([
    __param(0, repository_1.repository(repositories_1.HospitalUserRepository)),
    __param(1, repository_1.repository(repositories_1.CompanyUserRepository)),
    __metadata("design:paramtypes", [repositories_1.HospitalUserRepository,
        repositories_1.CompanyUserRepository])
], TenderProcessPostRequest);
exports.TenderProcessPostRequest = TenderProcessPostRequest;
//# sourceMappingURL=tenderProcessPost.js.map