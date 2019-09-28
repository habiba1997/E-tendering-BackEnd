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
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const obj_model_1 = require("../models/obj.model");
let TenderProcessController = class TenderProcessController {
    constructor(hospitalUserRepository, companyUserRepository, tenderProcessRepository) {
        this.hospitalUserRepository = hospitalUserRepository;
        this.companyUserRepository = companyUserRepository;
        this.tenderProcessRepository = tenderProcessRepository;
    }
    //add tender process to user 
    async addTenderToCompanyByUserID(direct, Userid, TenderProcessId) {
        let user = this.companyUserRepository.findById(Userid);
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
        const user = this.hospitalUserRepository.findById(Userid);
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
    async createTender(tenderProcess) {
        let companies = tenderProcess.Companies_Selected;
        let hospital = this.hospitalUserRepository.findById(tenderProcess.Issued_Hospital_ID);
        tenderProcess.Hospital_Name = (await hospital).name;
        const tender = this.tenderProcessRepository.create(tenderProcess);
        let id = (await tender)._id;
        if (!(id == undefined)) {
            var tenderId = id;
            this.addTenderToHospitalByUserID(tenderProcess.Issued_Hospital_ID, tenderId);
            companies.forEach(companyId => {
                this.addTenderToCompanyByUserID(tenderProcess.Direct_Process, companyId, tenderId);
            });
        }
        return tender;
    }
    async find() {
        return this.tenderProcessRepository.find();
    }
    /*
      @patch('/tender-processes', {
        responses: {
          '200': {
            description: 'TenderProcess PATCH success count',
            content: {'application/json': {schema: CountSchema}},
          },
        },
      })
      async updateAll(
        @requestBody({
          content: {
            'application/json': {
              schema: getModelSchemaRef(TenderProcess, {partial: true}),
            },
          },
        })
        tenderProcess: TenderProcess,
        @param.query.object('where', getWhereSchemaFor(TenderProcess)) where?: Where<TenderProcess>,
      ): Promise<Count> {
        return this.tenderProcessRepository.updateAll(tenderProcess, where);
      }
      @put('/tender-processes/{id}', {
        responses: {
          '204': {
            description: 'TenderProcess PUT success',
          },
        },
      })
      async replaceById(
        @param.path.string('id') id: string,
        @requestBody() tenderProcess: TenderProcess,
      ): Promise<void> {
        await this.tenderProcessRepository.replaceById(id, tenderProcess);
      }
    
    */
    async findById(id) {
        return this.tenderProcessRepository.findById(id);
    }
    async updateById(id, tenderProcess) {
        await this.tenderProcessRepository.updateById(id, tenderProcess);
    }
    async deleteById(id) {
        await this.tenderProcessRepository.deleteById(id);
    }
    async getAgreedItemNumber(obj) {
        let tender = this.tenderProcessRepository.findById(obj.TenderingProcessId);
        return (await tender).Submitted;
    }
};
__decorate([
    rest_1.post('/tender-process', {
        responses: {
            '200': {
                description: 'TenderProcess model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.TenderProcess) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.TenderProcess),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.TenderProcess]),
    __metadata("design:returntype", Promise)
], TenderProcessController.prototype, "createTender", null);
__decorate([
    rest_1.get('/tender-processes', {
        responses: {
            '200': {
                description: 'Array of TenderProcess model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.TenderProcess) },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TenderProcessController.prototype, "find", null);
__decorate([
    rest_1.get('/tender-processes/{id}', {
        responses: {
            '200': {
                description: 'TenderProcess model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.TenderProcess) } },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenderProcessController.prototype, "findById", null);
__decorate([
    rest_1.patch('/tender-processes/{id}', {
        responses: {
            '204': {
                description: 'TenderProcess PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.TenderProcess, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.TenderProcess]),
    __metadata("design:returntype", Promise)
], TenderProcessController.prototype, "updateById", null);
__decorate([
    rest_1.del('/tender-processes/{id}', {
        responses: {
            '204': {
                description: 'TenderProcess DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TenderProcessController.prototype, "deleteById", null);
__decorate([
    rest_1.post('/tender-Agreed-property', {
        responses: {
            '200': {
                description: 'Number of accepted items for User company',
                content: { 'application/json': { schema: obj_model_1.CompaniesSubmittedTenderObject } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.AcceptObject),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.AcceptObject]),
    __metadata("design:returntype", Promise)
], TenderProcessController.prototype, "getAgreedItemNumber", null);
TenderProcessController = __decorate([
    __param(0, repository_1.repository(repositories_1.HospitalUserRepository)),
    __param(1, repository_1.repository(repositories_1.CompanyUserRepository)),
    __param(2, repository_1.repository(repositories_1.TenderProcessRepository)),
    __metadata("design:paramtypes", [repositories_1.HospitalUserRepository,
        repositories_1.CompanyUserRepository,
        repositories_1.TenderProcessRepository])
], TenderProcessController);
exports.TenderProcessController = TenderProcessController;
//# sourceMappingURL=tender-process.controller.js.map