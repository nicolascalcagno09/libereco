import User from '../../Domain/Entities/User';
import UserServices from '../../Services/Users/UserServices';
import CryptoHashPasswordServices from '../../Services/Users/CryptoHashPasswordServices';
import UpdateUserCommand from '../../Commands/Users/UpdateUserCommand';

import commandBus from '../../Commands/CommandBus';
import InvalidArgumentException from '../../Exceptions/InvalidArgumentException';

export default class UpdateUserHandler {
  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  public async  handle(command : UpdateUserCommand) {
    const data = JSON.parse(JSON.stringify(command));
    const { warehouseId } = data;
    delete data.warehouseId;

    let user = new User(data);

    const userExist = await this.userServices.getById(user.id);
    const emailExist = await this.userServices.getByEmail(user.email);
    if (emailExist && userExist.id !== emailExist.id) {
      throw new InvalidArgumentException(`The email ${user.email} is already taken`);
    } 

    if (command.getPassword()) {
      const cryptoHashPasswordServices = new CryptoHashPasswordServices();
      const password = cryptoHashPasswordServices.passwordHash(command.getPassword());
      user.setPassword(password.hash);
      user.setSalt(password.salt);
    }

    user = await this.userServices.store(user);
   
    return user;
  }
}
