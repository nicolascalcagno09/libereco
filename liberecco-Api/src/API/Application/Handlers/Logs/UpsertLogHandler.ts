import UpsertLogCommand from '../../Commands/Logs/UpsertLogCommand';
import LogServices from '../../Services/Logs/LogServices';
import Log from '../../Domain/Entities/Log/Log';
import { UpsertLogSchema } from '../../../Controllers/Schemas/LogSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertLogHandler {
  private logServices: LogServices;
  private validator : Validator;

  constructor() {
    this.logServices = new LogServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertLogSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertLogCommand) {
    this.validate(command);
    const log = new Log(command);
    const match = await this.logServices.findOne({where : { id : log.getId() } });
    if (match) log.setId(match.getId());
    return await this.logServices.store(log);
  }

}
