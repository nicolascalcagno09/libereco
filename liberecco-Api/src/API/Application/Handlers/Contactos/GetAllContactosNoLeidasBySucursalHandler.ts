import ContactoServices from '../../Services/Contactos/ContactoServices';
import GetAllContactosNoLeidasBySucursalCommand from '../../Commands/Contactos/GetAllContactosNoLeidasBySucursalCommand';

export default class GetAllContactosNoLeidasBySucursalHandler {
  private contactoServices: ContactoServices;

  constructor() {
    this.contactoServices = new ContactoServices();
  }

  public async  handle(command : GetAllContactosNoLeidasBySucursalCommand) {
    // TODO: Implement bussines logic
    return await this.contactoServices.getAllNoLeidasBySucursal(command.getId());
  }
}
