import ContactoServices from '../../Services/Contactos/ContactoServices';
import GetAllContactosLeidasCommand from '../../Commands/Contactos/GetAllContactosLeidasCommand';

export default class GetAllContactosLeidasHandler {
  private contactoServices: ContactoServices;

  constructor() {
    this.contactoServices = new ContactoServices();
  }

  public async  handle(command : GetAllContactosLeidasCommand) {
    // TODO: Implement bussines logic
    return await this.contactoServices.getAllNoLeidas();
  }
}
