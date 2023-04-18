import UpdateResponseCommand from '../../Commands/Responses/UpdateResponseCommand';
import ResponseServices from '../../Services/Responses/ResponseServices';
import Response from '../../Domain/Entities/Log/LogResponse';
import { UpdateResponseSchema } from '../../../Controllers/Schemas/ResponseSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateResponseHandler {
  private responseServices: ResponseServices;
  private validator : Validator;

  constructor() {
    this.responseServices = new ResponseServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateResponseSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateResponseCommand) {
    this.validate(command);
    const response = new Response(command);
    return await this.responseServices.update(response);
  }
}
