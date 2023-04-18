import ServiceExpiration from '../../Domain/Entities/ServiceExpiration';
import { getRepository, Repository } from 'typeorm';

/**
 * @package ServiceExpirationsServices
 * @author Martin Wehren
 * @email <tinwehren@gmail.com>
 */
export default class ServiceExpirationsServices {
  private repo : Repository<ServiceExpiration>;

  constructor() {}

  public async store(serviceExpiration: ServiceExpiration) {
    this.repo = getRepository(ServiceExpiration);
    return await this.repo.save(serviceExpiration);
  }

  public async getByService(serviceType: number) {
    this.repo = getRepository(ServiceExpiration);
    return this.repo.findOne({ serviceType });
  }
  
  public async destroy(id: number) {
    this.repo = getRepository(ServiceExpiration);
    return await this.repo.delete(id);
  }
  
  public async destroyByservice(serviceType: number) {
    this.repo = getRepository(ServiceExpiration);
    return this.repo.delete({ serviceType });
  }
  
  public async destroyAll() {
    this.repo = getRepository(ServiceExpiration);
    return this.repo.delete({ });
  }
}