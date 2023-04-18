import User from '../../Domain/Entities/User';
import UserServices from '../../Services/Users/UserServices';
import CryptoHashPasswordServices from '../../Services/Users/CryptoHashPasswordServices';
import CreateUserCommand from '../../Commands/Users/CreateUserCommand';

import commandBus from '../../Commands/CommandBus';
import InvalidArgumentException from '../../Exceptions/InvalidArgumentException';

import * as _ from 'lodash';
import { asyncForEach } from '../../../Common/AsyncForeach';


export default class CreateUserHandler {
  private userServices: UserServices;
  private cryptoHashPasswordServices: CryptoHashPasswordServices;

  constructor() {
    this.userServices = new UserServices();
    this.cryptoHashPasswordServices = new CryptoHashPasswordServices();
  }

  public async  handle(command: CreateUserCommand) {
    const data = JSON.parse(JSON.stringify(command));
    const { warehouseId, createPermissions } = data;
    delete data.warehouseId;
    delete data.createPermissions;
    let user = new User(data);   
    

    const password = await this.cryptoHashPasswordServices.passwordHash(command.getPassword());
    user.setPassword(password.hash);
    user.setSalt(password.salt);

    const emailExist = await this.userServices.getByEmail(user.email);
    if (emailExist) {
      throw new InvalidArgumentException('The email has already taken');
    }
    
    user = await this.userServices.store(user);    

    return user;
  }
}
