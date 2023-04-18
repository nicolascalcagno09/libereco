import { Command } from 'simple-command-bus';
import * as _ from 'lodash';

export default class CloseQueueCommand extends Command {
  private queue : string;

  constructor(queue : string) {
    super();
    this.queue = queue;
  }
  
  getQueue() : string{
    return this.queue;
  }
}
