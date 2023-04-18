import CreateCommandInstanceCommand from '../../Commands/CommandInstances/CreateCommandInstanceCommand';
import CommandInstanceServices from '../../Services/CommandInstances/CommandInstanceServices';
import CommandInstance from '../../Domain/Entities/CommandInstance';
import { StoreCommandInstanceSchema } from '../../../Controllers/Schemas/CommandInstanceSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class CreateCommandInstanceHandler {
  private commandInstanceServices: CommandInstanceServices;
  private validator : Validator;

  constructor() {
    this.commandInstanceServices = new CommandInstanceServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreCommandInstanceSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateCommandInstanceCommand) {
    this.validate(command);
    const commandInstance = new CommandInstance(command);
    return await this.commandInstanceServices.store(commandInstance);
  }
}
