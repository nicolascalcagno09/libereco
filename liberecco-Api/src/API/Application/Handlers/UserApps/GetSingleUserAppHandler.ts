import GetSingleUserAppCommand from '../../Commands/UserApps/GetSingleUserAppCommand';
import UserAppServices from '../../Services/UserApps/UserAppServices';

export default class GetSingleUserAppHandler {
  private userAppServices: UserAppServices;

  constructor() {
    this.userAppServices = new UserAppServices();
  }

  public async  handle(command : GetSingleUserAppCommand) {
    return await this.userAppServices.getById(command.getId());
  }
}
