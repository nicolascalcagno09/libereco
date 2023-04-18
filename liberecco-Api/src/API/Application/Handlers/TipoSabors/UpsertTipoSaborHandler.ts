import UpsertTipoSaborCommand from '../../Commands/TipoSabors/UpsertTipoSaborCommand';
import TipoSaborServices from '../../Services/TipoSabors/TipoSaborServices';
import TipoSabor from '../../Domain/Entities/TipoSabor';
import { UpsertTipoSaborSchema } from '../../../Controllers/Schemas/TipoSaborSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertTipoSaborHandler {
  private tipoSaborServices: TipoSaborServices;
  private validator : Validator;

  constructor() {
    this.tipoSaborServices = new TipoSaborServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertTipoSaborSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertTipoSaborCommand) {
    this.validate(command);
    const tipoSabor = new TipoSabor(command);
    const match = await this.tipoSaborServices.findOne({where : { id : tipoSabor.getId() } });
    if (match) tipoSabor.setId(match.getId());
    return await this.tipoSaborServices.store(tipoSabor);
  }

}
