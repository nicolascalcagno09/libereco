import CreateRequestCommand from '../../Commands/Requests/CreateRequestCommand';
import RequestServices from '../../Services/Requests/RequestServices';
import LogRequest from '../../Domain/Entities/Log/LogRequest';
import { StoreRequestSchema } from '../../../Controllers/Schemas/RequestSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class CreateRequestHandler {
  private requestServices: RequestServices;
  private validator : Validator;

  constructor() {
    this.requestServices = new RequestServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreRequestSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateRequestCommand) {
    this.validate(command);
    const request = new LogRequest(command);
    return await this.requestServices.store(request);
  }
}
