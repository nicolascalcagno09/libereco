import ServiceExpiration from '../../Domain/Entities/ServiceExpiration';
import RemovePidCommand from '../../Commands/CommandPids/RemovePidCommand';
import CommandPidsServices from '../../Services/CommandPids/CommandPidsServices';
import ServiceExpirationServices from '../../Services/CommandPids/ServiceExpirationServices';
import CommandInstanceServices from '../../Services/CommandInstances/CommandInstanceServices';

import moment from 'moment';
import { spawn } from 'child_process';
import { ServiceType } from '../../Domain/Enums/ServiceType';

export default class RemoveCommandPidHandler {
  private commandPidsServices: CommandPidsServices;
  private commandInstanceServices: CommandInstanceServices;
  private serviceExpirationServices: ServiceExpirationServices;

  constructor() {
    this.commandPidsServices = new CommandPidsServices();
    this.commandInstanceServices = new CommandInstanceServices();
    this.serviceExpirationServices = new ServiceExpirationServices();
  }

  public async  handle(command : RemovePidCommand) {
    let instances, allPids;
    const timeExpirated = 1; // Is a hour
    let serviceExpiration = new ServiceExpiration();

    switch(command.getService()) {
      /**
      * ALL
      */
      case 'all':
        // Specific time to server off
        serviceExpiration.setServiceType(ServiceType.SERVER);
        serviceExpiration.setExpirationDate(getExpirationDate(timeExpirated));
        await this.serviceExpirationServices.store(serviceExpiration);
        
        serviceExpiration.setServiceType(ServiceType.SYNC);
        serviceExpiration.setExpirationDate(getExpirationDate(timeExpirated));
        await this.serviceExpirationServices.store(serviceExpiration);
  
        const pids = await this.commandPidsServices.getToDestroy();
        instances = await this.commandInstanceServices.getAll();
        await this.commandPidsServices.killAll();
        await this.commandInstanceServices.clean();
        
        allPids = instances.map(x => x.getId().toString()).concat(pids.map(x => x.getPid().toString()));
        await killAll(allPids);
        
      break;
      
      /**
       * SERVER
       */
      case 'server':
        const pid = await this.commandPidsServices.getAlive();
        if (pid) {
          // Specific time to server off
          serviceExpiration.setServiceType(ServiceType.SERVER);
          serviceExpiration.setExpirationDate(getExpirationDate(timeExpirated));
          await this.serviceExpirationServices.store(serviceExpiration);
  
          // Kill server
          await this.commandPidsServices.kill(pid.getPid());
          process.kill(pid.getPid());
        }
      break;
      
      /**
       * SYNC
       */
      case 'sync':
        serviceExpiration.setServiceType(ServiceType.SYNC);
        serviceExpiration.setExpirationDate(getExpirationDate(timeExpirated));
        await this.serviceExpirationServices.store(serviceExpiration);

        instances = await this.commandInstanceServices.getAll();
        await this.commandInstanceServices.clean();
        allPids = instances.map(x => x.getId().toString());
        await killAll(allPids);
    }
  }
}

const killAll = (pids: string[]) : void => {
  const kill = spawn('kill', pids);
  kill.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  kill.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  kill.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

const getExpirationDate = (timeExpirated: number) => {
  return moment(new Date).add(timeExpirated, 'h').format()
}