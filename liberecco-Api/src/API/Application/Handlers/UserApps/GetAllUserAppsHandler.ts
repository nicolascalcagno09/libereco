import GetAllUserAppsCommand from '../../Commands/UserApps/GetAllUserAppsCommand';
import UserAppServices from '../../Services/UserApps/UserAppServices';

export default class GetAllUserAppsHandler {
  private userAppServices: UserAppServices;

  constructor() {
    this.userAppServices = new UserAppServices();
  }

  public async  handle(command : GetAllUserAppsCommand) {
    // TODO: Implement bussines logic
    return await this.userAppServices.getAll();
  }
}
