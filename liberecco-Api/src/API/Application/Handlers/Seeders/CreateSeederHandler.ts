import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import CommandBus from '../../Commands/CommandBus';
import CreateSeederCommand from '../../Commands/Seeders/CreateSeederCommand';
import Seeders from '../../Domain/Entities/Seeders';

export default class CreateSeederHandler {
  private validator: Validator;

  constructor() {
    this.validator = new Validator();

  }

  private validate(command) {
    // const error = this.validator.validate(command, StoreSorterSchema);

    // if (error) {
    //   throw new RequiredFieldException(this.validator.validationResult(error.details));
    // }
  }

  public async handle(command: CreateSeederCommand) {
    this.validate(command);
    const seeders = new Seeders(command);
    return await CommandBus.handle(seeders);
  }
}
