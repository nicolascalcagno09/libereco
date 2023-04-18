import UpdateLogCommand from '../../Commands/Logs/UpdateLogCommand';
import LogServices from '../../Services/Logs/LogServices';
import Log from '../../Domain/Entities/Log/Log';
import { UpdateLogSchema } from '../../../Controllers/Schemas/LogSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateLogHandler {
  private logServices: LogServices;
  private validator : Validator;

  constructor() {
    this.logServices = new LogServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateLogSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateLogCommand) {
    this.validate(command);
    const log = new Log(command);
    return await this.logServices.update(log);
  }
}
