import UserAppServices from '../../Services/UserApps/UserAppServices';
import GetUserAppByUidCommand from '../../Commands/UserApps/GetUserAppByUidCommand';

export default class GetUserAppByUidHandler {
  private userAppServices: UserAppServices;

  constructor() {
    this.userAppServices = new UserAppServices();
  }

  public async  handle(command : GetUserAppByUidCommand) {
    return await this.userAppServices.getByUid(command.getUid());
  }
}
