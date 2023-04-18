import CreateSucursalPresentacionCommand from '../../Commands/SucursalPresentacions/CreateSucursalPresentacionCommand';
import SucursalPresentacionServices from '../../Services/SucursalPresentacions/SucursalPresentacionServices';
import SucursalPresentacion from '../../Domain/Entities/SucursalPresentacion';
import { StoreSucursalPresentacionSchema } from '../../../Controllers/Schemas/SucursalPresentacionSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class CreateSucursalPresentacionHandler {
  private sucursalPresentacionServices: SucursalPresentacionServices;
  private validator : Validator;

  constructor() {
    this.sucursalPresentacionServices = new SucursalPresentacionServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreSucursalPresentacionSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateSucursalPresentacionCommand) {
    this.validate(command);
    const sucursalPresentacion = new SucursalPresentacion(command);
    return await this.sucursalPresentacionServices.store(sucursalPresentacion);
  }
}
