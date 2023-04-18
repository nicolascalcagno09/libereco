import { Command } from 'simple-command-bus';

export default class GetAllCanjeablesCommand extends Command {



  // private validator: Validator;
  //
  userId;
  constructor(userId?) {
    super();
    this.userId = userId;
  }
}
