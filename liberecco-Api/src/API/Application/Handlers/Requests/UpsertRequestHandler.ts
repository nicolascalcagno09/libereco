import UpsertRequestCommand from '../../Commands/Requests/UpsertRequestCommand';
import RequestServices from '../../Services/Requests/RequestServices';
import LogRequest from '../../Domain/Entities/Log/LogRequest';
import { UpsertRequestSchema } from '../../../Controllers/Schemas/RequestSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertRequestHandler {
  private requestServices: RequestServices;
  private validator : Validator;

  constructor() {
    this.requestServices = new RequestServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertRequestSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertRequestCommand) {
    this.validate(command);
    const request = new LogRequest(command);
    const match = await this.requestServices.findOne({where : { id : request.getId() } });
    if (match) request.setId(match.getId());
    return await this.requestServices.store(request);
  }

}
