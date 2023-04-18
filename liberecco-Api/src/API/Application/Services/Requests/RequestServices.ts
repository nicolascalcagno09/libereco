import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import LogRequest from '../../Domain/Entities/Log/LogRequest';
import { getRepository, Repository } from 'typeorm';

/**
 * @package RequestServices
 * @author Martin Wehren
 * @email <tinwehren@gmail.com>
 */
export default class RequestServices {
  private requestRepository: Repository<LogRequest>;

  constructor() {
  }

  public async getAll() {
    this.requestRepository = getRepository(LogRequest);
    return await this.requestRepository.find();
  }

  public async findOne(conditions) {
    this.requestRepository = getRepository(LogRequest);
    return await this.requestRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.requestRepository = getRepository(LogRequest);
    const request = await this.requestRepository.findOne({ where: { id } });

    if (!request) {
      throw new NotFoundEntityException(`Request with id: ${id} not found`);
    }

    return request;
  }

  public async store(request: LogRequest) {
    this.requestRepository = getRepository(LogRequest);
    return await this.requestRepository.save(request);
  }

  public async update(request: LogRequest) {
    this.requestRepository = getRepository(LogRequest);

    const affected = await this.requestRepository.createQueryBuilder()
      .update(LogRequest)
      .set(request)
      .where('id = :id', { id: request.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.requestRepository = getRepository(LogRequest);
    const affected = await this.requestRepository.delete(id);

    return affected;
  }
}
