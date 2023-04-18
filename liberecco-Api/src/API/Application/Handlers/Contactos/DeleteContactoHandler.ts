import DeleteContactoCommand from '../../Commands/Contactos/DeleteContactoCommand';
import ContactoServices from '../../Services/Contactos/ContactoServices';

export default class DeleteContactoHandler {
  private contactoServices: ContactoServices;

  constructor() {
    this.contactoServices = new ContactoServices();
  }

  public async  handle(command : DeleteContactoCommand) {
    return await this.contactoServices.destroy(command.getId());
  }
}
