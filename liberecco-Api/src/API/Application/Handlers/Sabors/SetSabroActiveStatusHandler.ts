import SetSabroActiveStatusCommand from '../../Commands/Sabors/SetSabroActiveStatusCommand';
import SaborServices from '../../Services/Sabors/SaborServices';
import Sabor from '../../Domain/Entities/Sabor';
import { SetSabroActiveStatusSchema } from '../../../Controllers/Schemas/SaborSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class SetSabroActiveStatusHandler {
  private saborServices: SaborServices;
  private validator: Validator;

  constructor() {
    this.saborServices = new SaborServices();
    this.validator = new Validator();
  }


  private validate(command) {
    const error = this.validator.validate(command, SetSabroActiveStatusSchema);

    if (error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command: SetSabroActiveStatusCommand) {
    this.validate(command);
    const sabor = new Sabor(command);
    return await this.saborServices.updateActivoStatus(sabor);
  }
}
