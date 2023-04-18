import UpsertSucursalSaborCommand from '../../Commands/SucursalSabors/UpsertSucursalSaborCommand';
import SucursalSaborServices from '../../Services/SucursalSabors/SucursalSaborServices';
import SucursalSabor from '../../Domain/Entities/SucursalSabor';
import { UpsertSucursalSaborSchema } from '../../../Controllers/Schemas/SucursalSaborSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertSucursalSaborHandler {
  private sucursalSaborServices: SucursalSaborServices;
  private validator : Validator;

  constructor() {
    this.sucursalSaborServices = new SucursalSaborServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertSucursalSaborSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertSucursalSaborCommand) {
    this.validate(command);
    const sucursalSabor = new SucursalSabor(command);
    const match = await this.sucursalSaborServices.findOne({where : { id : sucursalSabor.getId() } });
    if (match) sucursalSabor.setId(match.getId());
    return await this.sucursalSaborServices.store(sucursalSabor);
  }

}
