import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import SucursalSabor from '../../Domain/Entities/SucursalSabor';
import { getRepository, Repository } from 'typeorm';

/**
 * @package SucursalSaborServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class SucursalSaborServices {
  private sucursalSaborRepository: Repository<SucursalSabor>;

  constructor() {
  }

  public async getAll() {
    this.sucursalSaborRepository = getRepository(SucursalSabor);
    return await this.sucursalSaborRepository.find();
  }

  public async findOne(conditions) {
    this.sucursalSaborRepository = getRepository(SucursalSabor);
    return await this.sucursalSaborRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.sucursalSaborRepository = getRepository(SucursalSabor);
    const sucursalSabor = await this.sucursalSaborRepository.findOne({ where: { id } });

    if (!sucursalSabor) {
      throw new NotFoundEntityException(`SucursalSabor with id: ${id} not found`);
    }

    return sucursalSabor;
  }

  public async store(sucursalSabor: SucursalSabor) {
    this.sucursalSaborRepository = getRepository(SucursalSabor);
    return await this.sucursalSaborRepository.save(sucursalSabor);
  }

  public async update(sucursalSabor: SucursalSabor) {
    this.sucursalSaborRepository = getRepository(SucursalSabor);

    const affected = await this.sucursalSaborRepository.createQueryBuilder()
      .update(SucursalSabor)
      .set(sucursalSabor)
      .where('id = :id', { id: sucursalSabor.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.sucursalSaborRepository = getRepository(SucursalSabor);
    const affected = await this.sucursalSaborRepository.delete(id);

    return affected;
  }
}
