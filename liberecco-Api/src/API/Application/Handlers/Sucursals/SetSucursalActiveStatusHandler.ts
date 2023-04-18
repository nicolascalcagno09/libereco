import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'
import { SetSucursalActiveStatusSchema } from '../../../Controllers/Schemas/SucursalSchema';
import SetSucursalActiveStatusCommand from '../../Commands/Sucursals/SetSucursalActiveStatusCommand';
import SucursalServices from '../../Services/Sucursals/SucursalServices';
import Sucursal from '../../Domain/Entities/Sucursal';

export default class SetSucursalActiveStatusHandler {
  private sucursalService: SucursalServices;
  private validator: Validator;

  constructor() {
    this.sucursalService = new SucursalServices();
    this.validator = new Validator();
  }


  private validate(command) {
    const error = this.validator.validate(command, SetSucursalActiveStatusSchema);

    if (error) {
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command: SetSucursalActiveStatusCommand) {
    this.validate(command);
    const sucursal = new Sucursal(command);
    return await this.sucursalService.updateActivoStatus(sucursal);
  }
}
