import Validator from '../../../Common/Validator';
import { Command } from 'simple-command-bus';

export class GetUserAppByUid{

}

export default class GetUserAppByUidCommand extends Command {

  uid : string;
  

  private validator: Validator;

  constructor(uid : string) {
    super();
    this.uid = uid;

    
  }

  getUid() {
    return this.uid;
  }
}
