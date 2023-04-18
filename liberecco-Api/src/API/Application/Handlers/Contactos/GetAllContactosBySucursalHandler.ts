import ContactoServices from '../../Services/Contactos/ContactoServices';
import GetAllContactosBySucursalCommand from '../../Commands/Contactos/GetAllContactosBySucursalCommand';

export default class GetAllContactosBySucursalHandler {
  private contactoServices: ContactoServices;

  constructor() {
    this.contactoServices = new ContactoServices();
  }

  public async  handle(command : GetAllContactosBySucursalCommand) {
    // TODO: Implement bussines logic
    return await this.contactoServices.getAllBySucursal(command.getId());
  }
}
