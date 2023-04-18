import GetSingleContactoCommand from '../../Commands/Contactos/GetSingleContactoCommand';
import ContactoServices from '../../Services/Contactos/ContactoServices';

export default class GetSingleContactoHandler {
  private contactoServices: ContactoServices;

  constructor() {
    this.contactoServices = new ContactoServices();
  }

  public async  handle(command : GetSingleContactoCommand) {
    return await this.contactoServices.getById(command.getId());
  }
}
