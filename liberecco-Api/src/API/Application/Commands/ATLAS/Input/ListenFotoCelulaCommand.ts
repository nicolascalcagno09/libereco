import ReadQueueCommand from '../ReadQueueCommand';
import { FotoCelulaAdapterSchema } from '../../../../Controllers/Schemas/ATLAS/FotoCelulaAdapter';

export default class ListenFotoCelulaCommand extends ReadQueueCommand {
  private static queue : string = "ATLASFOTOCELULAS";
  protected schema = FotoCelulaAdapterSchema;

  constructor() {
    super(ListenFotoCelulaCommand.queue);
  }
}
