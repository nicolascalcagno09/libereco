import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import PresentacionServices from '../../Services/Presentacions/PresentacionServices';
import SetPresentacionActiveStatusCommand from '../../Commands/Presentacions/SetPresentacionActiveStatusCommand';
import Presentacion from '../../Domain/Entities/Presentacion';
import { SetPresentacionActiveStatusSchema } from '../../../Controllers/Schemas/PresentacionSchema';

export default class SetPresentacionActiveStatusHandler {
  private presentacionService: PresentacionServices;
  private validator: Validator;

  constructor() {
    this.presentacionService = new PresentacionServices();
    this.validator = new Validator();
  }


  private validate(command) {
    const error = this.validator.validate(command, SetPresentacionActiveStatusSchema);

    if (error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command: SetPresentacionActiveStatusCommand) {
    this.validate(command);
    const presentacion = new Presentacion(command);
    return await this.presentacionService.updateActivoStatus(presentacion);
  }
}
