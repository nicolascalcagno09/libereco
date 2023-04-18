import { Command } from 'simple-command-bus';
import * as _ from 'lodash';

export default class CreateLogCommand extends Command {

  constructor(body: Object) {
    super();
    _.assign(this, body);
  }
}
