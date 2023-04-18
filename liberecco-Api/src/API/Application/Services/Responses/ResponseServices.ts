import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import LogResponse from '../../Domain/Entities/Log/LogResponse';
import { getRepository, Repository } from 'typeorm';

/**
 * @package ResponseServices
 * @author Martin Wehren
 * @email <tinwehren@gmail.com>
 */
export default class ResponseServices {
  private responseRepository: Repository<LogResponse>;

  constructor() {
  }

  public async getAll() {
    this.responseRepository = getRepository(LogResponse);
    return await this.responseRepository.find();
  }

  public async findOne(conditions) {
    this.responseRepository = getRepository(LogResponse);
    return await this.responseRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.responseRepository = getRepository(LogResponse);
    const response = await this.responseRepository.findOne({ where: { id } });

    if (!response) {
      throw new NotFoundEntityException(`Response with id: ${id} not found`);
    }

    return response;
  }

  public async store(response: LogResponse) {
    this.responseRepository = getRepository(LogResponse);
    return await this.responseRepository.save(response);
  }

  public async update(response: LogResponse) {
    this.responseRepository = getRepository(LogResponse);

    const affected = await this.responseRepository.createQueryBuilder()
      .update(LogResponse)
      .set(response)
      .where('id = :id', { id: response.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.responseRepository = getRepository(LogResponse);
    const affected = await this.responseRepository.delete(id);

    return affected;
  }
}
