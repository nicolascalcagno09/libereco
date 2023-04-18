import * as _ from 'lodash';
import SendMessageToQueueCommand from '../SendMessageToQueueCommand';
import {DisplayAdapterSchema} from '../../../../Controllers/Schemas/ATLAS/DisplayAdapter';
import {color} from '../../../Domain/Enums/ATLAS/soporte';

export default class SendDisplayAdapterCommand extends SendMessageToQueueCommand {
  protected static queue = 'ATLASPICKORDERS';
  protected schema = DisplayAdapterSchema;
  protected message = {
    color: color.ROJO,
    valor : 0,
    ascii : false
  }

  /**
  * @func constructor
  * @param message The message to be pushed into the queue
  **/
  constructor(message: any) {
    super({ queue : SendDisplayAdapterCommand.queue, message});
    if (isNaN(message.valor)){
      message.valor = message.valor.charCodeAt(0);
      message.ascii = true;
    }
    _.assign(this.message, message );
  }
}
