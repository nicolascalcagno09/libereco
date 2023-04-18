import UpdateSucursalSaborCommand from '../../Commands/SucursalSabors/UpdateSucursalSaborCommand';
import SucursalSaborServices from '../../Services/SucursalSabors/SucursalSaborServices';
import SucursalSabor from '../../Domain/Entities/SucursalSabor';
import { UpdateSucursalSaborSchema } from '../../../Controllers/Schemas/SucursalSaborSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateSucursalSaborHandler {
  private sucursalSaborServices: SucursalSaborServices;
  private validator : Validator;

  constructor() {
    this.sucursalSaborServices = new SucursalSaborServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateSucursalSaborSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateSucursalSaborCommand) {
    this.validate(command);
    const sucursalSabor = new SucursalSabor(command);
    return await this.sucursalSaborServices.update(sucursalSabor);
  }
}
