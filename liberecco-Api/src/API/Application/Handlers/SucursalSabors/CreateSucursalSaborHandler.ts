import CreateSucursalSaborCommand from '../../Commands/SucursalSabors/CreateSucursalSaborCommand';
import SucursalSaborServices from '../../Services/SucursalSabors/SucursalSaborServices';
import SucursalSabor from '../../Domain/Entities/SucursalSabor';
import { StoreSucursalSaborSchema } from '../../../Controllers/Schemas/SucursalSaborSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class CreateSucursalSaborHandler {
  private sucursalSaborServices: SucursalSaborServices;
  private validator : Validator;

  constructor() {
    this.sucursalSaborServices = new SucursalSaborServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreSucursalSaborSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateSucursalSaborCommand) {
    this.validate(command);
    const sucursalSabor = new SucursalSabor(command);
    return await this.sucursalSaborServices.store(sucursalSabor);
  }
}
