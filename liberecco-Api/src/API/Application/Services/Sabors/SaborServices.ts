import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Sabor from '../../Domain/Entities/Sabor';
import { getRepository, Repository } from 'typeorm';

/**
 * @package SaborServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class SaborServices {
  private saborRepository: Repository<Sabor>;

  constructor() {
  }

  public async getAll() {
    this.saborRepository = getRepository(Sabor);
    return await this.saborRepository.find({ relations: ["tipoSabor"], order: { titulo: 'ASC' } });
  }

  public async findOne(conditions) {
    this.saborRepository = getRepository(Sabor);
    return await this.saborRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.saborRepository = getRepository(Sabor);
    const sabor = await this.saborRepository.findOne({ where: { id }, relations: ["tipoSabor"] });

    if (!sabor) {
      throw new NotFoundEntityException(`Sabor with id: ${id} not found`);
    }

    return sabor;
  }

  public async store(sabor: Sabor) {
    this.saborRepository = getRepository(Sabor);
    return await this.saborRepository.save(sabor);
  }

  public async update(sabor: Sabor) {
    this.saborRepository = getRepository(Sabor);

    const affected = await this.saborRepository.createQueryBuilder()
      .update(Sabor)
      .set(sabor)
      .where('id = :id', { id: sabor.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.saborRepository = getRepository(Sabor);
    const affected = await this.saborRepository.delete(id);

    return affected;
  }

  public async updateActivoStatus(sabor: Sabor) {
    this.saborRepository = getRepository(Sabor);

    const affected = await this.saborRepository.createQueryBuilder()
      .update(Sabor)
      .set({ activo: sabor.getActivo() })
      .where('id = :id', { id: sabor.getId() })
      .execute();

    return affected;
  }

  public async getAllActivos() {
    this.saborRepository = getRepository(Sabor);
    return await this.saborRepository.find({where: {activo : true}, relations: ["tipoSabor"], order: { titulo: 'ASC' } });
  }

  public async getAllByOrden() {
    this.saborRepository = getRepository(Sabor);
    return await this.saborRepository.find({relations: ["tipoSabor"], order: { orden: 'ASC' , titulo: 'ASC'} });
  }

  public async getAllActivosByOrden() {
    this.saborRepository = getRepository(Sabor);
    return await this.saborRepository.find({where: {activo : true}, relations: ["tipoSabor"], order: { orden: 'ASC' , titulo: 'ASC'} });
  }
}
