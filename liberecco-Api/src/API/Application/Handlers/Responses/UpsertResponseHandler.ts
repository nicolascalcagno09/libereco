import UpsertResponseCommand from '../../Commands/Responses/UpsertResponseCommand';
import ResponseServices from '../../Services/Responses/ResponseServices';
import Response from '../../Domain/Entities/Log/LogResponse';
import { UpsertResponseSchema } from '../../../Controllers/Schemas/ResponseSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertResponseHandler {
  private responseServices: ResponseServices;
  private validator : Validator;

  constructor() {
    this.responseServices = new ResponseServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertResponseSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertResponseCommand) {
    this.validate(command);
    const response = new Response(command);
    const match = await this.responseServices.findOne({where : { id : response.getId() } });
    if (match) response.setId(match.getId());
    return await this.responseServices.store(response);
  }

}
