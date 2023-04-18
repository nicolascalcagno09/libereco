import GetAllContactosCommand from '../../Commands/Contactos/GetAllContactosCommand';
import ContactoServices from '../../Services/Contactos/ContactoServices';

export default class GetAllContactosHandler {
  private contactoServices: ContactoServices;

  constructor() {
    this.contactoServices = new ContactoServices();
  }

  public async  handle(command : GetAllContactosCommand) {
    // TODO: Implement bussines logic
    return await this.contactoServices.getAll();
  }
}
