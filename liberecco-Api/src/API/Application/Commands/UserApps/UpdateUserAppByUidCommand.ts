import { Command } from 'simple-command-bus';
import * as _ from 'lodash';

export default class UpdateUserAppByUidCommand extends Command {
  private uid;

  constructor(body : Object) {
    super();
    _.assign(this, body);
  }

  getUid(){
    return this.uid;
  }

}
