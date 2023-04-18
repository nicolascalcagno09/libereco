import UpdateSucursalPresentacionCommand from '../../Commands/SucursalPresentacions/UpdateSucursalPresentacionCommand';
import SucursalPresentacionServices from '../../Services/SucursalPresentacions/SucursalPresentacionServices';
import SucursalPresentacion from '../../Domain/Entities/SucursalPresentacion';
import { UpdateSucursalPresentacionSchema } from '../../../Controllers/Schemas/SucursalPresentacionSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateSucursalPresentacionHandler {
  private sucursalPresentacionServices: SucursalPresentacionServices;
  private validator : Validator;

  constructor() {
    this.sucursalPresentacionServices = new SucursalPresentacionServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateSucursalPresentacionSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateSucursalPresentacionCommand) {
    this.validate(command);
    const sucursalPresentacion = new SucursalPresentacion(command);
    return await this.sucursalPresentacionServices.update(sucursalPresentacion);
  }
}
