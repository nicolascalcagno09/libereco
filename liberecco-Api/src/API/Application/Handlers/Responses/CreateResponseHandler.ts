import CreateResponseCommand from '../../Commands/Responses/CreateResponseCommand';
import ResponseServices from '../../Services/Responses/ResponseServices';
import Response from '../../Domain/Entities/Log/LogResponse';
import { StoreResponseSchema } from '../../../Controllers/Schemas/ResponseSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class CreateResponseHandler {
  private responseServices: ResponseServices;
  private validator : Validator;

  constructor() {
    this.responseServices = new ResponseServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreResponseSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateResponseCommand) {
    this.validate(command);
    const response = new Response(command);
    return await this.responseServices.store(response);
  }
}
