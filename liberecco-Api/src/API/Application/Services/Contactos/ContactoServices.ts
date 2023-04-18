import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Contacto from '../../Domain/Entities/Contacto';
import { getRepository, Repository } from 'typeorm';

/**
 * @package ContactoServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class ContactoServices {
  private contactoRepository : Repository<Contacto>;

  constructor() {
  }

  public async getAll() {
    this.contactoRepository = getRepository(Contacto);
    return await this.contactoRepository.createQueryBuilder('contacto')
    .leftJoin('contacto.sucursal', 'sucursal')
    .addSelect(['sucursal'])
    .orderBy('contacto.createdAt', 'DESC')
    .getMany()
    //return await this.contactoRepository.find({ relations: ['sucursal'], order: { createdAt: 'DESC'} });
  }

  public async findOne(conditions) {
    this.contactoRepository = getRepository(Contacto);
    return await this.contactoRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.contactoRepository = getRepository(Contacto);
    const contacto = await this.contactoRepository.find( { where : { id } , relations: ['sucursal']} );

    if (!contacto ) {
      throw new NotFoundEntityException(`Contacto with id: ${id} not found`);
    }

    return contacto;
  }

  public async store(contacto: Contacto) {
    this.contactoRepository = getRepository(Contacto);
    return await this.contactoRepository.save(contacto);
  }

  public async update(contacto: Contacto) {
    this.contactoRepository = getRepository(Contacto);

    const affected = await this.contactoRepository.createQueryBuilder()
    .update(Contacto)
    .set(contacto)
    .where('id = :id', { id : contacto.getId() })
    .execute();

    return affected;
  }

  public async destroy(id: number) {
    this.contactoRepository = getRepository(Contacto);
    const affected = await this.contactoRepository.delete(id);

    return affected;
  }

  public async getAllBySucursal(id: number) {
    this.contactoRepository = getRepository(Contacto);
    return await this.contactoRepository.find({ where: { sucursal: { id } }, order: { createdAt: 'DESC'} });
  }

  public async updateLeida(contacto: Contacto) {
    this.contactoRepository = getRepository(Contacto);

    const affected = await this.contactoRepository.createQueryBuilder()
      .update(Contacto)
      .set({ leida: contacto.isLeida() })
      .where('id = :id', { id: contacto.getId() })
      .execute();

    return affected;
  }

  public async getAllNoLeidas() {
    this.contactoRepository = getRepository(Contacto);
    return await this.contactoRepository.createQueryBuilder('contacto')
    .leftJoin('contacto.sucursal', 'sucursal')
    .addSelect(['sucursal'])
    .where('leida is false')
    .orderBy('contacto.createdAt', 'ASC')
    .getMany()
    //return await this.contactoRepository.find({where: { leida: false}, relations: ['sucursal'], order: { createdAt: 'DESC' } });
  }

  public async getAllNoLeidasBySucursal(id: number) {
    this.contactoRepository = getRepository(Contacto);
    return await this.contactoRepository.find({ where: { sucursal: { id } , leida: false }, order: { createdAt: 'DESC'} });
  }

  public async getAllDestacados() {
    this.contactoRepository = getRepository(Contacto);
    return await this.contactoRepository.find({ where: { destacado: true }, relations: ['sucursal'], order: { createdAt: 'DESC'} });
  }

  public async getDestacadosBySucursal(id: number) {
    this.contactoRepository = getRepository(Contacto);
    return await this.contactoRepository.find({ where:  { destacado: true , sucursal: { id }}, order: { createdAt: 'DESC'} });
  }

  public async updateDestacado(contacto: Contacto) {
    this.contactoRepository = getRepository(Contacto);

    const affected = await this.contactoRepository.createQueryBuilder()
      .update(Contacto)
      .set({ destacado: contacto.getDescatado() })
      .where('id = :id', { id: contacto.getId() })
      .execute();

    return affected;
  }
}
