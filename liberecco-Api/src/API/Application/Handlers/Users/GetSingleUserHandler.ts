import GetSingleUserCommand from '../../Commands/Users/GetSingleUserCommand';
import UserServices from '../../Services/Users/UserServices';

export default class GetSingleUserHandler {
  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  public async  handle(command : GetSingleUserCommand) {
    return await this.userServices.getById(command.getId());
  }
}
