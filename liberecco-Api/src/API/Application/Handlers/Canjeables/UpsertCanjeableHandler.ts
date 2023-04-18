import UpsertCanjeableCommand from '../../Commands/Canjeables/UpsertCanjeableCommand';
import CanjeableServices from '../../Services/Canjeables/CanjeableServices';
import Canjeable from '../../Domain/Entities/Canjeable';
import { UpsertCanjeableSchema } from '../../../Controllers/Schemas/CanjeableSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertCanjeableHandler {
  private canjeableServices: CanjeableServices;
  private validator : Validator;

  constructor() {
    this.canjeableServices = new CanjeableServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertCanjeableSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertCanjeableCommand) {
    this.validate(command);
    const canjeable = new Canjeable(command);
    const match = await this.canjeableServices.findOne({where : { id : canjeable.getId() } });
    if (match) canjeable.setId(match.getId());
    return await this.canjeableServices.store(canjeable);
  }

}
