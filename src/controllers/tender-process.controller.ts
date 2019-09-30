import {
  repository, NumberType,
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
import {TenderProcess, CompanyUser, AcceptObject} from '../models';
import {TenderProcessRepository, CompanyUserRepository, HospitalUserRepository} from '../repositories';
import { CompaniesSubmittedTenderObject } from '../models/obj.model';
import { TenderArray } from '../models/tender-array.model';
import { TenderProcessArray } from '../models/tender-process-array.model';



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

  let user = this.companyUserRepository.findById(Userid);
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
  
    const user = this.hospitalUserRepository.findById(Userid);
  
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
   let hospital = this.hospitalUserRepository.findById(tenderProcess.Issued_Hospital_ID);
   tenderProcess.Hospital_Name = (await hospital).name;
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

 tenderss:TenderProcessArray;


  @post('/all-tender-processes', {
    responses: {
      '200': {
        description: 'Get Array of TenderProcess model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TenderArray)},
          },
        },
      },
    },
  })
  async findAllTenderArray(@requestBody({
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(TenderProcess,{partial: true})},
      },
    },
  })

  arr: TenderProcess[],
): Promise<TenderProcess[]> {


  for(var i =0 ; i < arr.length; ++i)
      { 
        let tender =await this.tenderProcessRepository.findById(arr[i]._id)
    
        if(!(tender==undefined)){          
            
              arr[i]= tender;
        }
  
      }

        return  arr;
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

  @post('/tender-Agreed-property', {
    responses: {
      '200': {
        description: 'Number of accepted items for User company',
        content: { 'application/json': { schema: CompaniesSubmittedTenderObject } },
      },
    },
  })
  async getAgreedItemNumber(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(AcceptObject),
      },
    },
  })
  obj: AcceptObject,
  ): Promise<CompaniesSubmittedTenderObject[] | undefined> {
    let tender =  this.tenderProcessRepository.findById(obj.TenderingProcessId);

    return (await tender).Submitted;
  }



}
