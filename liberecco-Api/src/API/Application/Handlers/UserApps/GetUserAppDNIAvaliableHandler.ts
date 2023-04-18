import UserAppServices from '../../Services/UserApps/UserAppServices';
import GetUserAppDNIAvaliableCommand from '../../Commands/UserApps/GetUserAppDNIAvaliableCommand';

export default class GetUserAppDNIAvaliableHandler {
  private userAppServices: UserAppServices;

  constructor() {
    this.userAppServices = new UserAppServices();
  }

  public async  handle(command : GetUserAppDNIAvaliableCommand) {
    return !!await this.userAppServices.getByDNI(command.getDNI());
  }
}
