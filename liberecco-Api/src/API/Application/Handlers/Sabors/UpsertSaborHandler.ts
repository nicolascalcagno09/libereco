import UpsertSaborCommand from '../../Commands/Sabors/UpsertSaborCommand';
import SaborServices from '../../Services/Sabors/SaborServices';
import Sabor from '../../Domain/Entities/Sabor';
import { UpsertSaborSchema } from '../../../Controllers/Schemas/SaborSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertSaborHandler {
  private saborServices: SaborServices;
  private validator : Validator;

  constructor() {
    this.saborServices = new SaborServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertSaborSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertSaborCommand) {
    this.validate(command);
    const sabor = new Sabor(command);
    const match = await this.saborServices.findOne({where : { id : sabor.getId() } });
    if (match) sabor.setId(match.getId());
    return await this.saborServices.store(sabor);
  }

}
