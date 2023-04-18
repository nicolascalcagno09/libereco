import { Command } from 'simple-command-bus';
import * as _ from 'lodash';

export default class ReadQueueCommand extends Command {
  private queue : string;
  protected schema : any;
  private static instance : ReadQueueCommand;
  private static channels = {};
  

  constructor(queue : string) {
    super();
    this.queue = queue;
  }
  
  getQueue() : string{
    return this.queue;
  }
  
  getSchema() : any{
    return this.schema;
  }
  
  static setChannel(queue : string , channel ){
    ReadQueueCommand.channels[queue] = channel;
  }
  
  static getChannel(queue : string){
    return ReadQueueCommand.channels[queue];
  }
}
