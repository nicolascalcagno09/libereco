import DeleteUserAppCommand from '../../Commands/UserApps/DeleteUserAppCommand';
import UserAppServices from '../../Services/UserApps/UserAppServices';

export default class DeleteUserAppHandler {
  private userAppServices: UserAppServices;

  constructor() {
    this.userAppServices = new UserAppServices();
  }

  public async  handle(command : DeleteUserAppCommand) {
    return await this.userAppServices.destroy(command.getId());
  }
}
