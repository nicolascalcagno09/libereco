import UpsertContactoCommand from '../../Commands/Contactos/UpsertContactoCommand';
import ContactoServices from '../../Services/Contactos/ContactoServices';
import Contacto from '../../Domain/Entities/Contacto';
import { UpsertContactoSchema } from '../../../Controllers/Schemas/ContactoSchema'
import RequiredFieldException from '../../Exceptions/RequiredFieldException';
import Validator from '../../../Common/Validator';

export default class UpsertContactoHandler {
  private contactoServices: ContactoServices;
  private validator : Validator;

  constructor() {
    this.contactoServices = new ContactoServices();
    this.validator = new Validator();
  }

  private validate(command){
    const error = this.validator.validate(command, UpsertContactoSchema);
    if(error) {
      const details = this.validator.validationResult(error.details)
      throw new RequiredFieldException(this.validator.validationResult(error.details));
    }
  }

  public async  handle(command : UpsertContactoCommand) {
    this.validate(command);
    const contacto = new Contacto(command);
    const match = await this.contactoServices.findOne({where : { id : contacto.getId() } });
    if (match) contacto.setId(match.getId());
    return await this.contactoServices.store(contacto);
  }

}
