import UpsertPresentacionCommand from '../../Commands/Presentacions/UpsertPresentacionCommand';
import PresentacionServices from '../../Services/Presentacions/PresentacionServices';
import Presentacion from '../../Domain/Entities/Presentacion';
import { UpsertPresentacionSchema } from '../../../Controllers/Schemas/PresentacionSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertPresentacionHandler {
  private presentacionServices: PresentacionServices;
  private validator : Validator;

  constructor() {
    this.presentacionServices = new PresentacionServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertPresentacionSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertPresentacionCommand) {
    this.validate(command);
    const presentacion = new Presentacion(command);
    const match = await this.presentacionServices.findOne({where : { id : presentacion.getId() } });
    if (match) presentacion.setId(match.getId());
    return await this.presentacionServices.store(presentacion);
  }

}
