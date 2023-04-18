import { Command } from 'simple-command-bus';
import * as _ from 'lodash';

export default class UpdateLogCommand extends Command {
  private id;

  constructor(body : Object) {
    super();
    _.assign(this, body);
  }

  getId(){
    return this.id;
  }

}
