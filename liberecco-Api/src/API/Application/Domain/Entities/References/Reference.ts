import Validator from '../../../../Common/Validator';
import { ReferenceSchema } from '../../../../Controllers/Schemas/ReferenceSchema';
export default class Reference {
  private id: number;
  private length: number;
  protected reference: string;

  constructor(id: number | string, length?: number) {

    const validator = new Validator();
    validator.validate({ reference: Number(id) }, ReferenceSchema);


    const id_string = String(id);
    if (id_string.length > length) throw new Error(`The id ${id} exceeds maximum length of ${length}`);

    if (id_string.length > 0) {
      this.id = Number(id);
      const padding = length - id_string.length;
      this.reference = "0".repeat(padding) + id_string;
    } else {
      this.reference = String(id);
    }
  }

  toString() {
    return this.reference;
  }

}
