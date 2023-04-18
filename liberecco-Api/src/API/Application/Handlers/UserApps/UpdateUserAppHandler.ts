import UpdateUserAppCommand from '../../Commands/UserApps/UpdateUserAppCommand';
import UserAppServices from '../../Services/UserApps/UserAppServices';
import UserApp from '../../Domain/Entities/UserApp';
import { UpdateUserAppSchema } from '../../../Controllers/Schemas/UserAppSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateUserAppHandler {
  private userAppServices: UserAppServices;
  private validator : Validator;

  constructor() {
    this.userAppServices = new UserAppServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateUserAppSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateUserAppCommand) {
    this.validate(command);
    const userApp = new UserApp(command);
    return await this.userAppServices.update(userApp);
  }
}
