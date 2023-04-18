import UpdateCommandInstanceCommand from '../../Commands/CommandInstances/UpdateCommandInstanceCommand';
import CommandInstanceServices from '../../Services/CommandInstances/CommandInstanceServices';
import CommandInstance from '../../Domain/Entities/CommandInstance';
import { UpdateCommandInstanceSchema } from '../../../Controllers/Schemas/CommandInstanceSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateCommandInstanceHandler {
  private commandInstanceServices: CommandInstanceServices;
  private validator : Validator;

  constructor() {
    this.commandInstanceServices = new CommandInstanceServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateCommandInstanceSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateCommandInstanceCommand) {
    this.validate(command);
    const commandInstance = new CommandInstance(command);
    return await this.commandInstanceServices.update(commandInstance);
  }
}
