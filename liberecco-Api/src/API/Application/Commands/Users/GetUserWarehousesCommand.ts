import { Command } from 'simple-command-bus';
import Validator from '../../../Common/Validator';
import { CheckUserIdSchema } from '../../../Controllers/Schemas/UserSchema';
import RequiredFieldException from '../../Exceptions/RequiredFieldException';

export default class GetUserWarehousesCommand extends Command {
  private id : number;
  private validator: Validator;

  constructor(id : number) {
    super();

    this.validator = new Validator();
    const error = this.validator.validate({ id }, CheckUserIdSchema);

    if (error) {
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }

    this.id = id;
  }

  getId() {
    return this.id;
  }
}
