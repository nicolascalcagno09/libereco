import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import { getRepository, Repository } from 'typeorm';
import Seeders from '../../Domain/Entities/Seeders';
import DuplicatedEntryException from '../../Exceptions/DuplicatedEntryException';

/**
 * @package SeedersServices
 * @author Martin Wehren
 * @email <tinwehren@gmail.com>
 */
export default class SeedersServices {
  private seedersRepository: Repository<Seeders>;

  constructor() {
  }

  public async getAll() {
    this.seedersRepository = getRepository(Seeders);
    return await this.seedersRepository.find();
  }

  public async findOne(conditions) {
    this.seedersRepository = getRepository(Seeders);
    return await this.seedersRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.seedersRepository = getRepository(Seeders);
    const seeder = await this.seedersRepository.findOne({ where: { id } });

    if (!seeder) {
      throw new NotFoundEntityException(`Seeder with id: ${id} not found`);
    }

    return seeder;
  }
  public async getByName(name: string) {
    this.seedersRepository = getRepository(Seeders);
    return await this.seedersRepository.findOne({ where: { name } });
  }

  public async store(seeder: Seeders) {
    this.seedersRepository = getRepository(Seeders);
    return await this.seedersRepository.save(seeder);
  }

  public async update(seeder: Seeders) {
    this.seedersRepository = getRepository(Seeders);

    await this.seedersRepository.createQueryBuilder()
      .update(Seeders)
      .set(seeder)
      .where('id = :id', { id: seeder.getId() })
      .execute();

    return this.getById(seeder.getId());
  }

  public async destroy(id: number) {
    await this.getById(id);
    this.seedersRepository = getRepository(Seeders);
    const affected = await this.seedersRepository.delete(id);

    return affected;
  }
}
