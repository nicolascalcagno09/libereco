import * as _ from 'lodash';
import {Command} from 'simple-command-bus'

export default class SoundAlarmCommand extends Command {
  private timeout;
  constructor(timeout: number = 3000) {
    super();
    this.timeout = timeout;
  }
  
  getTimeout(){
    return this.timeout;
  }
}
