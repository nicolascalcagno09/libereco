import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import SucursalPresentacion from '../../Domain/Entities/SucursalPresentacion';
import { getRepository, Repository } from 'typeorm';

/**
 * @package SucursalPresentacionServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class SucursalPresentacionServices {
  private sucursalPresentacionRepository: Repository<SucursalPresentacion>;

  constructor() {
  }

  public async getAll() {
    this.sucursalPresentacionRepository = getRepository(SucursalPresentacion);
    return await this.sucursalPresentacionRepository.find();
  }

  public async findOne(conditions) {
    this.sucursalPresentacionRepository = getRepository(SucursalPresentacion);
    return await this.sucursalPresentacionRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.sucursalPresentacionRepository = getRepository(SucursalPresentacion);
    const sucursalPresentacion = await this.sucursalPresentacionRepository.findOne({ where: { id } });

    if (!sucursalPresentacion) {
      throw new NotFoundEntityException(`SucursalPresentacion with id: ${id} not found`);
    }

    return sucursalPresentacion;
  }

  public async store(sucursalPresentacion: SucursalPresentacion) {
    this.sucursalPresentacionRepository = getRepository(SucursalPresentacion);
    return await this.sucursalPresentacionRepository.save(sucursalPresentacion);
  }

  public async update(sucursalPresentacion: SucursalPresentacion) {
    this.sucursalPresentacionRepository = getRepository(SucursalPresentacion);

    const affected = await this.sucursalPresentacionRepository.createQueryBuilder()
      .update(SucursalPresentacion)
      .set(sucursalPresentacion)
      .where('id = :id', { id: sucursalPresentacion.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.sucursalPresentacionRepository = getRepository(SucursalPresentacion);
    const affected = await this.sucursalPresentacionRepository.delete(id);

    return affected;
  }
}
