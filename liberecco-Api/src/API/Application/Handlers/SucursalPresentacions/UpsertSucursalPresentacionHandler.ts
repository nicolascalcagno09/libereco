import UpsertSucursalPresentacionCommand from '../../Commands/SucursalPresentacions/UpsertSucursalPresentacionCommand';
import SucursalPresentacionServices from '../../Services/SucursalPresentacions/SucursalPresentacionServices';
import SucursalPresentacion from '../../Domain/Entities/SucursalPresentacion';
import { UpsertSucursalPresentacionSchema } from '../../../Controllers/Schemas/SucursalPresentacionSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertSucursalPresentacionHandler {
  private sucursalPresentacionServices: SucursalPresentacionServices;
  private validator : Validator;

  constructor() {
    this.sucursalPresentacionServices = new SucursalPresentacionServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertSucursalPresentacionSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertSucursalPresentacionCommand) {
    this.validate(command);
    const sucursalPresentacion = new SucursalPresentacion(command);
    const match = await this.sucursalPresentacionServices.findOne({where : { id : sucursalPresentacion.getId() } });
    if (match) sucursalPresentacion.setId(match.getId());
    return await this.sucursalPresentacionServices.store(sucursalPresentacion);
  }

}
