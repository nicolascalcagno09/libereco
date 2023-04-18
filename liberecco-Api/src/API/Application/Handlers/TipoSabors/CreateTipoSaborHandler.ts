import CreateTipoSaborCommand from '../../Commands/TipoSabors/CreateTipoSaborCommand';
import TipoSaborServices from '../../Services/TipoSabors/TipoSaborServices';
import TipoSabor from '../../Domain/Entities/TipoSabor';
import { StoreTipoSaborSchema } from '../../../Controllers/Schemas/TipoSaborSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class CreateTipoSaborHandler {
  private tipoSaborServices: TipoSaborServices;
  private validator : Validator;

  constructor() {
    this.tipoSaborServices = new TipoSaborServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreTipoSaborSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateTipoSaborCommand) {
    this.validate(command);
    const tipoSabor = new TipoSabor(command);
    return await this.tipoSaborServices.store(tipoSabor);
  }
}
