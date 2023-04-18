import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import CommandInstance from '../../Domain/Entities/CommandInstance';
import {
  getRepository,
  Repository,
  LessThan,
} from 'typeorm';

/**
 * @package CommandInstanceServices
 * @author Martin Wehren
 * @email <tinwehren@gmail.com>
 */
export default class CommandInstanceServices {
  private commandInstanceRepository: Repository<CommandInstance>;

  constructor() {
    //this.commandInstanceRepository = getRepository(CommandInstance);
  }

  // Removes all entries on DB
  public async clear() {
    this.commandInstanceRepository = getRepository(CommandInstance);
    return await this.commandInstanceRepository.createQueryBuilder()
      .delete()
      .where([
        { pid: process.pid },
        { expirationDate: LessThan(new Date()) }
      ])
      .execute();
  }

  // Removes expired entries on DB
  public async clean() {
    this.commandInstanceRepository = getRepository(CommandInstance);
    return await this.commandInstanceRepository.createQueryBuilder()
      .delete()
      .where({ expirationDate: LessThan(new Date()) })
      .execute();
  }

  public async find(options?) {
    this.commandInstanceRepository = getRepository(CommandInstance);
    return await this.commandInstanceRepository.find(options);
  }

  public async getAll() {
    this.commandInstanceRepository = getRepository(CommandInstance);
    return await this.commandInstanceRepository.find();
  }

  public async findOne(conditions) {
    this.commandInstanceRepository = getRepository(CommandInstance);
    return await this.commandInstanceRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.commandInstanceRepository = getRepository(CommandInstance);
    const commandInstance = await this.commandInstanceRepository.findOne({ where: { id } });

    if (!commandInstance) {
      throw new NotFoundEntityException(`CommandInstance with id: ${id} not found`);
    }

    return commandInstance;
  }

  public async store(commandInstance: CommandInstance) {
    this.commandInstanceRepository = getRepository(CommandInstance);
    return await this.commandInstanceRepository.save(commandInstance);
  }

  public async update(commandInstance: CommandInstance) {
    this.commandInstanceRepository = getRepository(CommandInstance);

    const affected = await this.commandInstanceRepository.createQueryBuilder()
      .update(CommandInstance)
      .set(commandInstance)
      .where('id = :id', { id: commandInstance.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.commandInstanceRepository = getRepository(CommandInstance);
    const affected = await this.commandInstanceRepository.delete(id);

    return affected;
  }
}
