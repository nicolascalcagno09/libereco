import CommandPid from '../../Domain/Entities/CommandPid';
import { getRepository, Repository, getConnection } from 'typeorm';

/**
 * @package CommandPidsServices
 * @author Martin Wehren
 * @email <tinwehren@gmail.com>
 */
export default class CommandPidsServices {
  private repo : Repository<CommandPid>;

  constructor() {}

  public async getByPid(pid: number) {
    this.repo = getRepository(CommandPid);
    return this.repo.findOne({ pid });
  }
  
  public async getAlive() {
    this.repo = getRepository(CommandPid);
    return this.repo.findOne({ alive: 1 });
  }
  
  public async getToDestroy() {
    this.repo = getRepository(CommandPid);
    return this.repo.find({ softDeleted: 0 });
  }
  
  public async store(commandPid: CommandPid) {
    this.repo = getRepository(CommandPid);
    return this.repo.save(commandPid);
  }

  public async turnEverythingOff() {
    return await getConnection()
      .createQueryBuilder()
      .update(CommandPid)
      .set({ alive: 0 })
      .execute();
  }

  public async kill(pid: number) {
    return await getConnection()
      .createQueryBuilder()
      .update(CommandPid)
      .set({ alive: 0, softDeleted: 1 })
      .where("pid = :pid", { pid })
      .execute();
  }
  
  public async killAll() {
    return await getConnection()
      .createQueryBuilder()
      .update(CommandPid)
      .set({  alive: 0, softDeleted: 1 })
      .execute();
  }
}