import UpsertCommandInstanceCommand from '../../Commands/CommandInstances/UpsertCommandInstanceCommand';
import CommandInstanceServices from '../../Services/CommandInstances/CommandInstanceServices';
import CommandInstance from '../../Domain/Entities/CommandInstance';
import { UpsertCommandInstanceSchema } from '../../../Controllers/Schemas/CommandInstanceSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertCommandInstanceHandler {
  private commandInstanceServices: CommandInstanceServices;
  private validator : Validator;

  constructor() {
    this.commandInstanceServices = new CommandInstanceServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertCommandInstanceSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertCommandInstanceCommand) {
    this.validate(command);
    const commandInstance = new CommandInstance(command);
    const match = await this.commandInstanceServices.findOne({where : { id : commandInstance.getId() } });
    if (match) commandInstance.setId(match.getId());
    return await this.commandInstanceServices.store(commandInstance);
  }

}
