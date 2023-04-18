import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Log from '../../Domain/Entities/Log/Log';
import { getRepository, Repository } from 'typeorm';

/**
 * @package LogServices
 * @author Martin Wehren
 * @email <tinwehren@gmail.com>
 */
export default class LogServices {
  private logRepository: Repository<Log>;

  constructor() {
  }

  public async getAll() {
    this.logRepository = getRepository(Log);
    return await this.logRepository.find();
  }

  public async findOne(conditions) {
    this.logRepository = getRepository(Log);
    return await this.logRepository.findOne(conditions);
  }

  public async getBeforeDay(days: number) {
    this.logRepository = getRepository(Log);

    let d = new Date();
    d.setDate(d.getDate() - days);
    const dt = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

    const affected = await this.logRepository.createQueryBuilder()
      .select()
      .where('createdAt < :date', { date: dt })
      .execute();

    return affected;
  }

  public async getById(id: number) {
    this.logRepository = getRepository(Log);
    const log = await this.logRepository.findOne({ where: { id } });

    if (!log) {
      throw new NotFoundEntityException(`Log with id: ${id} not found`);
    }

    return log;
  }

  public async store(log: Log) {
    this.logRepository = getRepository(Log);
    return await this.logRepository.save(log);
  }

  public async update(log: Log) {
    this.logRepository = getRepository(Log);

    const affected = await this.logRepository.createQueryBuilder()
      .update(Log)
      .set(log)
      .where('id = :id', { id: log.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.logRepository = getRepository(Log);
    const affected = await this.logRepository.delete(id);

    return affected;
  }

  public async destoyBeforeDay(days: number) {
    this.logRepository = getRepository(Log);

    let d = new Date();
    d.setDate(d.getDate() - days);
    const dt = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    // console.log('date', d)
    // console.log('date', dt)

    const affected = await this.logRepository.createQueryBuilder()
      .delete()
      .from(Log)
      .where('createdAt < :date', { date: dt })
      .execute();

    return affected;
  }
}
