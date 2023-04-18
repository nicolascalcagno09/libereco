import SeederJsonSource from '../../API/Common/SeederJsonSource';
import CreateUserCommand from '../../API/Application/Commands/Users/CreateUserCommand';
import CommandBus from '../../API/Application/Commands/CommandBus';
import asyncForEach from '../../API/Common/AsyncForeach';

const usersJson = SeederJsonSource('users.json');

export default class UsersSeeder {

  public async seed() {

    await asyncForEach(usersJson.users, async user => {
      const createUserCommand = new CreateUserCommand(user, false);
      await CommandBus.handle(createUserCommand);
    });
  }
}
