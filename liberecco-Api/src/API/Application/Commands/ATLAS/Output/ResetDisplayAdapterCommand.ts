import * as _ from 'lodash';
import SendMessageToQueueCommand from '../SendMessageToQueueCommand';
import { ComandoAdapter } from '../../../../Controllers/Schemas/ATLAS/ComandoAdapter';

export default class ResetDisplayAdapterCommand extends SendMessageToQueueCommand {
  protected static queue = 'ATLASCOMANDOS';

  constructor(canid : number) {
    super( {
      queue : ResetDisplayAdapterCommand.queue,
      message : new ComandoAdapter(canid, 'R')
    });
  }
}
