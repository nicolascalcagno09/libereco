import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Novedad from '../../Domain/Entities/Novedad';
import { Brackets, getRepository, Repository } from 'typeorm';

/**
 * @package NovedadServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class NovedadServices {
  private novedadRepository : Repository<Novedad>;

  constructor() {
  }

  public async getAll() {
    this.novedadRepository = getRepository(Novedad);
    return await this.novedadRepository.find({where: {activo: true}});
  }

  public async findOne(conditions) {
    this.novedadRepository = getRepository(Novedad);
    return await this.novedadRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.novedadRepository = getRepository(Novedad);
    const novedad = await this.novedadRepository.createQueryBuilder('novedad')
    .leftJoin('novedad.sucursales', 'sucursal')
    .addSelect(['sucursal.id', 'sucursal.localidad', 'sucursal.direccion'])
    .where('novedad.id = :id', { id })
    .getOne()

    if (!novedad ) {
      throw new NotFoundEntityException(`Novedad with id: ${id} not found`);
    }

    return novedad;
  }

  public async store(novedad: Novedad) {
    this.novedadRepository = getRepository(Novedad);
    return await this.novedadRepository.save(novedad);
  }

  public async update(novedad: Novedad) {
    this.novedadRepository = getRepository(Novedad);

    const affected = await this.novedadRepository.createQueryBuilder()
    .update(Novedad)
    .set(novedad)
    .where('id = :id', { id : novedad.getId() })
    .execute();

    return affected;
  }

  public async delete(id: number) {
    this.novedadRepository = getRepository(Novedad);
    const affected = await this.novedadRepository.createQueryBuilder()
      .update(Novedad)
      .set({ activo: false })
      .where('id = :id', { id: id })
      .execute();

    return affected;
  }

  public async getOneById(id: number) {
    this.novedadRepository = getRepository(Novedad);
    const novedad = await this.novedadRepository.findOne({ where: { id }, relations: ['sucursales'] });

    if (!novedad) {
      throw new NotFoundEntityException(`novedad with id: ${id} not found`);
    }

    return novedad;
  }

  public async getBySucursalId(id: number) {
    this.novedadRepository = getRepository(Novedad);
    const novedades = await this.novedadRepository.createQueryBuilder('novedad')
      .leftJoin(
        'novedad.sucursales',
        'sucursal')
      .where('STR_TO_DATE(novedad.hasta, "%d/%m/%Y %T") > NOW()')
      .andWhere(new Brackets(qb => {
        qb.where('novedad.visibilidad = :visibilidad AND novedad.activo = :activo AND sucursal.id IS NULL',{ visibilidad: true, activo: true })
          .orWhere('novedad.activo = :activo AND sucursal.id = :id', { activo: true, id });
      }))
      // .andWhere('novedad.visibilidad = :visibilidad AND sucursal.id IS NULL', { visibilidad: true })

      .orderBy("STR_TO_DATE(novedad.desde, '%d/%m/%Y %T')", "ASC") /*Pasamos el string a Date con la hora incluida */
      .disableEscaping()
      .getMany();

    return novedades;
  }

  public async getAllGenerics() {
    this.novedadRepository = getRepository(Novedad);

    const novedades = await this.novedadRepository.createQueryBuilder('novedad')
      .leftJoin(
        'novedad.sucursales',
        'sucursal')
      .where('STR_TO_DATE(novedad.hasta, "%d/%m/%Y %T") > NOW()')
      .andWhere('novedad.activo = :activo AND sucursal.id IS NULL', { activo: true })
      .orderBy("STR_TO_DATE(novedad.desde, '%d/%m/%Y %T')", "ASC") /*Pasamos el string a Date con la hora incluida */
      .getMany();

    return novedades;
  }
}
