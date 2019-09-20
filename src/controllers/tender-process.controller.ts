import {
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TenderProcess, CompanyUser} from '../models';
import {TenderProcessRepository, CompanyUserRepository, HospitalUserRepository} from '../repositories';



export class TenderProcessController {
  constructor(
    @repository(HospitalUserRepository)
    public hospitalUserRepository : HospitalUserRepository,
    @repository(CompanyUserRepository)
    public companyUserRepository : CompanyUserRepository,
    @repository(TenderProcessRepository)
    public tenderProcessRepository : TenderProcessRepository,
  ) {}


//add tender process to user 
async addTenderToCompanyByUserID(direct:boolean ,Userid: string, TenderProcessId:string) {

  let user = this.companyUserRepository.findById(Userid, {
    fields: { password: false },
  });
  if(direct)
  {
    user = this.SpecifictenderEntered(await user,TenderProcessId);
  }
  else
  {
    user= this.NormaltenderEntered(await user,TenderProcessId);
  }

  await this.companyUserRepository.updateById(Userid, await user);
}


async NormaltenderEntered(user:CompanyUser,TenderProcessId:string):Promise<CompanyUser>
{
  let arr = (await user).TenderingProcessesEntered;

  if(!(arr==undefined)) 
  {
    arr.push(TenderProcessId);
    (await user).TenderingProcessesEntered = arr;
  }
  else 
  {
    var array =[];
    array.push(TenderProcessId);
    (await user).TenderingProcessesEntered = array;
  }
  return user;
}

async SpecifictenderEntered(user:CompanyUser,TenderProcessId:string):Promise<CompanyUser>
{
  let arr = (await user).specificTenderingProcessesEntered;

  if(!(arr==undefined)) 
  {
    arr.push(TenderProcessId);
    (await user).specificTenderingProcessesEntered = arr;
  }
  else 
  {
    var array =[];
    array.push(TenderProcessId);
    (await user).specificTenderingProcessesEntered = array;
  }
  return user;
}
async addTenderToHospitalByUserID(Userid: string, TenderProcessId:string) {
  
    const user = this.hospitalUserRepository.findById(Userid, {
      fields: { password: false },
    });
  
    let arr = (await user).TenderingProcessesCreated;
  
    if(!(arr==undefined)) 
    {
      arr.push(TenderProcessId);
      (await user).TenderingProcessesCreated = arr;
    }
    else 
    {
      var array =[];
      array.push(TenderProcessId);
      (await user).TenderingProcessesCreated = array;
    }
    await this.hospitalUserRepository.updateById(Userid, await user);
  }



  @post('/tender-process', {
    responses: {
      '200': {
        description: 'TenderProcess model instance',
        content: {'application/json': {schema: getModelSchemaRef(TenderProcess)}},
      },
    },
  })
  async createTender(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TenderProcess),
        },
      },
    })
    tenderProcess: TenderProcess,
  ): Promise<TenderProcess> { 
   let companies = tenderProcess.Companies_Selected;
   const tender = this.tenderProcessRepository.create(tenderProcess);
   let id = (await tender)._id;  
   
   if(!(id==undefined)) 
   {
      var tenderId = id;
      this.addTenderToHospitalByUserID(tenderProcess.Issued_Hospital_ID,tenderId);
      companies.forEach(companyId => {
        this.addTenderToCompanyByUserID(tenderProcess.Direct_Process,companyId,tenderId);
      });

   }
 
  return tender;
  }

/*
  @post('/tender-processes', {
    responses: {
      '200': {
        description: 'TenderProcess model instance',
        content: {'application/json': {schema: getModelSchemaRef(TenderProcess)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TenderProcess, {exclude: ['_id']}),
        },
      },
    })
    tenderProcess: Omit<TenderProcess, '_id'>,
  ): Promise<TenderProcess> {
    return this.tenderProcessRepository.create(tenderProcess);
  }



  @get('/tender-processes/count', {
    responses: {
      '200': {
        description: 'TenderProcess model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TenderProcess)) where?: Where<TenderProcess>,
  ): Promise<Count> {
    return this.tenderProcessRepository.count(where);
  }
*/
  @get('/tender-processes', {
    responses: {
      '200': {
        description: 'Array of TenderProcess model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TenderProcess)},
          },
        },
      },
    },
  })
  async find(): Promise<TenderProcess[]> {
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
  @get('/tender-processes/{id}', {
    responses: {
      '200': {
        description: 'TenderProcess model instance',
        content: {'application/json': {schema: getModelSchemaRef(TenderProcess)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<TenderProcess> {
    return this.tenderProcessRepository.findById(id);
  }

  @patch('/tender-processes/{id}', {
    responses: {
      '204': {
        description: 'TenderProcess PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TenderProcess, {partial: true}),
        },
      },
    })
    tenderProcess: TenderProcess,
  ): Promise<void> {
    await this.tenderProcessRepository.updateById(id, tenderProcess);
  }

  @del('/tender-processes/{id}', {
    responses: {
      '204': {
        description: 'TenderProcess DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tenderProcessRepository.deleteById(id);
  }



}
