import CommandPid from "../Application/Domain/Entities/CommandPid";
import CommandPidsServices from "../Application/Services/CommandPids/CommandPidsServices";

export async function registerPids(pid: number) {

  let commandPid;
  const commandPidServices = new CommandPidsServices();
  const pidExist = await commandPidServices.getByPid(pid);

  if (!pidExist) {
    await commandPidServices.turnEverythingOff();
    commandPid = new CommandPid();
    commandPid.setPid(pid);
    commandPid.setAlive(1);
    commandPid.setSoftDeleted(0);
  } else {
    commandPid = new CommandPid(pidExist);
    commandPid.setUpdatedAt();
  }
  await commandPidServices.store(commandPid);
};

export default registerPids;
