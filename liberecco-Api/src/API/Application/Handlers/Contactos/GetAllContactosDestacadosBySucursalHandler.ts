import ContactoServices from '../../Services/Contactos/ContactoServices';
import GetAllContactosDestacadosBySucursalCommand from '../../Commands/Contactos/GetAllContactosDestacadosBySucursalCommand ';

export default class GetAllContactosDestacadosBySucursalHandler {
  private contactoServices: ContactoServices;

  constructor() {
    this.contactoServices = new ContactoServices();
  }

  public async  handle(command : GetAllContactosDestacadosBySucursalCommand ) {
    // TODO: Implement bussines logic
    return await this.contactoServices.getDestacadosBySucursal(command.getId());
  }
}
