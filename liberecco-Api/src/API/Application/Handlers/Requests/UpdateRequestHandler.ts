import UpdateRequestCommand from '../../Commands/Requests/UpdateRequestCommand';
import RequestServices from '../../Services/Requests/RequestServices';
import LogRequest from '../../Domain/Entities/Log/LogRequest';
import { UpdateRequestSchema } from '../../../Controllers/Schemas/RequestSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateRequestHandler {
  private requestServices: RequestServices;
  private validator: Validator;

  constructor() {
    this.requestServices = new RequestServices();
    this.validator = new Validator();
  }



  private validate(command) {
    const error = this.validator.validate(command, UpdateRequestSchema);

    if (error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command: UpdateRequestCommand) {
    this.validate(command);
    const request = new LogRequest(command);
    return await this.requestServices.update(request);
  }
}
