import { ServiceType } from '../../Domain/Enums/ServiceType';
import RebootServiceCommand from '../../Commands/CommandPids/RebootServiceCommand';
import ServiceExpirationServices from '../../Services/CommandPids/ServiceExpirationServices';

export default class RemoveCommandPidHandler {
  private serviceExpirationServices: ServiceExpirationServices;

  constructor() {
    this.serviceExpirationServices = new ServiceExpirationServices();
  }

  public async  handle(command : RebootServiceCommand) {
    switch(command.getService()) {
      /**
       * SERVER
       */
      case 'server':
        await this.serviceExpirationServices.destroyByservice(ServiceType.SERVER)
      break;
      /**
       
       * SYNC
       */
      case 'sync':
        await this.serviceExpirationServices.destroyByservice(ServiceType.SYNC)
    }
  }
}