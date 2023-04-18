import * as _ from 'lodash';
import SendMessageToQueueCommand from '../SendMessageToQueueCommand';

export default class AlarmCommand extends SendMessageToQueueCommand {
  protected static queue = 'ATLASSIRENA';

  constructor(status : boolean) {
    super( {
      queue : AlarmCommand.queue,
      message : status
    });
  }
}
