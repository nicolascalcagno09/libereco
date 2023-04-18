import UpdateContactoCommand from '../../Commands/Contactos/UpdateContactoCommand';
import ContactoServices from '../../Services/Contactos/ContactoServices';
import Contacto from '../../Domain/Entities/Contacto';
import { UpdateContactoSchema } from '../../../Controllers/Schemas/ContactoSchema'
import Validator from '../../../Common/Validator';
import RequiredFieldException from '../../Exceptions/RequiredFieldException'

export default class UpdateContactoHandler {
  private contactoServices: ContactoServices;
  private validator : Validator;

  constructor() {
    this.contactoServices = new ContactoServices();
    this.validator = new Validator();
  }


  private validate(command){
    const error = this.validator.validate(command, UpdateContactoSchema);

    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpdateContactoCommand) {
    this.validate(command);
    const contacto = new Contacto(command);
    return await this.contactoServices.update(contacto);
  }
}
