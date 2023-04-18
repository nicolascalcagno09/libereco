import { MODEL_REFERENCE_LENGTH } from '../../../../Controllers/Schemas/ModelSchema';
import Reference from './Reference';

export default class ModelReference extends Reference {
  protected reference;

  constructor(id: number | string) {
    super(id, MODEL_REFERENCE_LENGTH);
  }

  getId() {
    return Number(this.reference);
  }
}


