import UpsertUserAppCommand from '../../Commands/UserApps/UpsertUserAppCommand';
import UserAppServices from '../../Services/UserApps/UserAppServices';
import UserApp from '../../Domain/Entities/UserApp';
import { UpsertUserAppSchema } from '../../../Controllers/Schemas/UserAppSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertUserAppHandler {
  private userAppServices: UserAppServices;
  private validator : Validator;

  constructor() {
    this.userAppServices = new UserAppServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertUserAppSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertUserAppCommand) {
    this.validate(command);
    const userApp = new UserApp(command);
    const match = await this.userAppServices.findOne({where : { id : userApp.getId() } });
    if (match) userApp.setId(match.getId());
    return await this.userAppServices.store(userApp);
  }

}
