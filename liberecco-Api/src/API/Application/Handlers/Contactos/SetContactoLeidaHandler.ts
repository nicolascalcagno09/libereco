import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import ContactoServices from '../../Services/Contactos/ContactoServices';
import { SetContactoLeidaStatusSchema } from '../../../Controllers/Schemas/ContactoSchema';
import Contacto from '../../Domain/Entities/Contacto';
import SetContactoLeidaCommand from '../../Commands/Contactos/SetContactoLeidaCommand';

export default class SetContactoLeidaHandler {
  private contactoService: ContactoServices;
  private validator: Validator;

  constructor() {
    this.contactoService = new ContactoServices();
    this.validator = new Validator();
  }

  private validate(command) {
    const error = this.validator.validate(command, SetContactoLeidaStatusSchema);

    if (error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async handle(command: SetContactoLeidaCommand) {
    this.validate(command);
    const contacto = new Contacto(command);
    return await this.contactoService.updateLeida(contacto);
  }
}
