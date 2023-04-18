import ContactoServices from '../../Services/Contactos/ContactoServices';
import GetAllContactosDestacadosCommand from '../../Commands/Contactos/GetAllContactosDestacadosCommand';

export default class GetAllContactosDestacadosHandler {
  private contactoServices: ContactoServices;

  constructor() {
    this.contactoServices = new ContactoServices();
  }

  public async  handle(command : GetAllContactosDestacadosCommand) {
    // TODO: Implement bussines logic
    return await this.contactoServices.getAllDestacados();
  }
}
