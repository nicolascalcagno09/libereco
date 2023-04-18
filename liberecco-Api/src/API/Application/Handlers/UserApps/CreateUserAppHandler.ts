import CreateUserAppCommand from '../../Commands/UserApps/CreateUserAppCommand';
import UserAppServices from '../../Services/UserApps/UserAppServices';
import UserApp from '../../Domain/Entities/UserApp';
import { StoreUserAppSchema } from '../../../Controllers/Schemas/UserAppSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class CreateUserAppHandler {
  private userAppServices: UserAppServices;
  private validator : Validator;

  constructor() {
    this.userAppServices = new UserAppServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, StoreUserAppSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : CreateUserAppCommand) {
    this.validate(command);
    const userApp = new UserApp(command);
    return await this.userAppServices.store(userApp);
  }
}
