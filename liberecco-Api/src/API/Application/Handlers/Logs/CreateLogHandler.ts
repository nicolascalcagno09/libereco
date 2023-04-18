import CreateLogCommand from '../../Commands/Logs/CreateLogCommand';
import LogServices from '../../Services/Logs/LogServices';
import Log from '../../Domain/Entities/Log/Log';
import { StoreLogSchema } from '../../../Controllers/Schemas/LogSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class CreateLogHandler {
  private logServices: LogServices;
  private validator : Validator;

  constructor() {
    this.logServices = new LogServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreLogSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateLogCommand) {
    this.validate(command);
    const log = new Log(command);
    return await this.logServices.store(log);
  }
}
