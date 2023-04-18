import ReadQueueCommand from '../ReadQueueCommand';

export default class ListenPickOrderACKCommand extends ReadQueueCommand {
  private static queue : string = "ATLASPICKORDERACKS";

  constructor() {
    super(ListenPickOrderACKCommand.queue);
  }
}
