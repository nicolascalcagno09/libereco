import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Cupon from '../../Domain/Entities/Cupon';
import { FindConditions, getRepository, IsNull, Not, Repository, In } from 'typeorm';
import ActionNotAllowedException from '../../Exceptions/ActionNotAllowedException';
import { CuponType } from '../../Domain/Enums/CuponType';
import CuponDiaCanje from '../../Domain/Entities/CuponDiaCanje';
import moment from 'moment';
import UserApp from '../../Domain/Entities/UserApp';
import User from '../../Domain/Entities/User';

/**
 * @package CuponServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class CuponServices {
  private cuponRepository: Repository<Cupon>;
  private cuponDiaRepository: Repository<CuponDiaCanje>;
  private userRepository: Repository<User>;

  constructor() {
  }

  public async getAll() {
    this.cuponRepository = getRepository(Cupon);
    return await this.cuponRepository.find();
  }

  public async findOne(conditions) {
    this.cuponRepository = getRepository(Cupon);
    return await this.cuponRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.cuponRepository = getRepository(Cupon);
    const cupon = await this.cuponRepository.find({ where: { id } });

    if (!cupon) {
      throw new NotFoundEntityException(`Cupon with id: ${id} not found`);
    }

    return cupon;
  }

  public async store(cupon: Cupon) {
    this.cuponRepository = getRepository(Cupon);
    return await this.cuponRepository.save(cupon);
  }

  public async scannedPromocion(cupon: Cupon) {
    this.cuponRepository = getRepository(Cupon);
    this.userRepository = getRepository(User);
    this.cuponDiaRepository = getRepository(CuponDiaCanje);


    let idPromocion = cupon.promocion;
    let idUsuario = cupon.usuarioApp;
    let idUserScan = cupon.usuarioScan;
    let userScan = await this.userRepository.findOne({ where: { id: idUserScan }, relations: ['sucursal'] });;

    cupon.setEstado('CANJEADO');
    let cupones = await this.cuponRepository.find(
      {
        where: { promocion: idPromocion, usuarioApp: idUsuario }, relations: ['usuarioApp', 'promocion', 'promocion.sucursales']
      }
    );

    let cuponSaved = cupones.filter( x => x.estado == 'OBTENIDO');
    let cuponesCanejados = cupones.filter( x => x.estado == 'CANJEADO');
    let cuponesCanjeadosIds = cuponesCanejados.map( x => x.getId());
    let diasCanjeados: CuponDiaCanje[] = [];
    if (cuponesCanjeadosIds.length > 0)
    diasCanjeados = await this.cuponDiaRepository.find({
      where: { cupon: { id: In(cuponesCanjeadosIds)}}, relations: ['cupon', 'cupon.promocion']
    });
    let affected;
    if (cuponSaved.length != 0) {
      // Hay un obtenido     
      this.isEnabledToRedeem(diasCanjeados, cuponSaved[0], userScan);

      affected = await this.cuponRepository.createQueryBuilder()
        .update(Cupon)
        .set(cupon)
        .where('id = :id', { id: cuponSaved[0].getId() })
        .execute();

    } else {
      // No Hay un obtenido
      cupon.setEstado('OBTENIDO');

      affected = await this.cuponRepository.save(cupon);

      cuponSaved = await this.cuponRepository.find(
        {
          where: { promocion: idPromocion, usuarioApp: idUsuario, estado:'OBTENIDO' }, relations: ['usuarioApp', 'promocion', 'promocion.sucursales']
        }
      );

      this.isEnabledToRedeem(diasCanjeados, cuponSaved[0], userScan);

      // cnahge status

      cupon.setEstado('CANJEADO');

      affected = await this.cuponRepository.save(cupon);

    }

    let diaCanje = new CuponDiaCanje({
      cupon: cuponSaved[0],
      dia_canje: new Date(),
      sucursal: userScan.sucursal
    });

    await this.saveCuponDiaCanjeado(diaCanje);

    return cuponSaved[0];
  }


  public async generate(cupon: Cupon) {
    this.cuponRepository = getRepository(Cupon);
    let idPromocion = cupon.promocion;
    let idUsuario = cupon.usuarioApp;
    cupon.setEstado('OBTENIDO');
    const cuponSaved = await this.cuponRepository.find(
      {
        where: { promocion: idPromocion, usuarioApp: idUsuario, estado:'OBTENIDO' }
      }
    );

    let affected;
    if (cuponSaved.length != 0) {
      affected = await this.cuponRepository.createQueryBuilder()
        .update(Cupon)
        .set(cupon)
        .where('id = :id', { id: cuponSaved[0].getId() })
        .execute();

    } else {
      affected = await this.cuponRepository.save(cupon);
    }


    return affected;
  }

  public async update(cupon: Cupon) {
    this.cuponRepository = getRepository(Cupon);

    const affected = await this.cuponRepository.createQueryBuilder()
      .update(Cupon)
      .set(cupon)
      .where('id = :id', { id: cupon.getId() })
      .execute();

    return affected;
  }

  public async destroy(id: number, userId: number) {
    this.cuponRepository = getRepository(Cupon);
    const affected = await this.cuponRepository.createQueryBuilder()
      .delete()
      .from(Cupon)
      .where('promocionId = :id', { id })
      .andWhere('estado = :estado',{estado:'OBTENIDO'})
      .andWhere('usuarioAppId = :userId', { userId })
      .execute()

    return affected;
  }

  public async getByUserId(id: number, filters?: any) {

    let conditions: any = { usuarioApp: id };

    if (filters && filters.toLowerCase() == 'promocion') {
      conditions = {
        ...conditions,
        promocion: Not(IsNull())
      }
    }

    if (filters && filters.toLowerCase() == 'canjeable') {
      conditions = {
        ...conditions,
        canjeable: Not(IsNull())
      }
    }

    this.cuponRepository = getRepository(Cupon);
    const cupon = await this.cuponRepository.find({ where: conditions, relations: ["promocion", "canjeable"] });

    if (!cupon) {
      throw new NotFoundEntityException(`Cupon with id: ${id} not found`);
    }

    let results = cupon.map((c: Cupon) => {
      let result: any = c;
      result.cupon = result.promocion ? result.promocion : result.canjeable;
      delete result.promocion;
      delete result.canjeable;
      return result;
    })

    return results;
  }


  public async getByUserScanId(id: number, filters?: any) {

    let conditions: any = { usuarioScan: id };

    if (filters && filters.toLowerCase() == 'promocion') {
      conditions = {
        ...conditions,
        promocion: Not(IsNull())
      }
    }

    if (filters && filters.toLowerCase() == 'canjeable') {
      conditions = {
        ...conditions,
        canjeable: Not(IsNull())
      }
    }

    this.cuponRepository = getRepository(Cupon);
    const cupon = await this.cuponRepository.find({
      where: conditions,
      relations: ['usuarioApp', 'promocion', 'canjeable'],
      order: {
        updatedAt: "DESC"
      }
    });

    if (!cupon) {
      throw new NotFoundEntityException(`Cupon with id: ${id} not found`);
    }

    let results = cupon.map((c: Cupon) => {
      let result: any = c;
      result.cupon = result.promocion ? result.promocion : result.canjeable;
      delete result.promocion;
      delete result.canjeable;
      return result;
    })


    return results;
  }

  public async getBySucursalId(id: number) {
    this.cuponRepository = getRepository(Cupon);
    const cupon = await this.cuponRepository.createQueryBuilder('cupon')
      .leftJoin('cupon.promocion', 'promocion')
      .leftJoin('cupon.usuarioApp', 'usuarioApp')
      .leftJoin('promocion.sucursales', 'sucursal')
      .addSelect(['promocion', 'usuarioApp'])
      .where('sucursal.id = :id', { id })
      .orderBy('cupon.createdAt', 'DESC')
      .getMany()


    //await this.cuponRepository.find({ where: { sucursal: id }, relations: ["promocion"] });

    if (!cupon) {
      throw new NotFoundEntityException(`Cupon with id: ${id} not found`);
    }

    return cupon;
  }

  public async scannedCanjeable(cupon: Cupon) {
    this.cuponRepository = getRepository(Cupon);
    let idCanje = cupon.canjeable;
    let idUsuario = cupon.usuarioApp;
    let idUserScan = cupon.usuarioScan;
    cupon.setEstado('CANJEADO');
    cupon.type = CuponType.CANJEABLE;
    let cuponSaved = await this.cuponRepository.find(
      {
        where: { canjeable: idCanje, usuarioApp: idUsuario, estado: 'OBTENIDO' }, relations: ['usuarioApp', 'canjeable',]
      }
    );

    let affected;
    if (cuponSaved.length != 0) {

      if (cuponSaved[0].estado == 'CANJEADO') {
        throw new ActionNotAllowedException(`Cupon with id: ${cuponSaved[0].getId()} redeemed`);
      }

      affected = await this.cuponRepository.createQueryBuilder()
        .update(Cupon)
        .set(cupon)
        .where('id = :id', { id: cuponSaved[0].getId() })
        .execute();

    } else {
      affected = await this.cuponRepository.save(cupon);
      cuponSaved = await this.cuponRepository.find(
        {
          where: { canjeable: idCanje, usuarioApp: idUsuario }, relations: ['usuarioApp', 'canjeable']
        }
      );
    }


    return cuponSaved[0];
  }

  public async saveCuponDiaCanjeado(entity: CuponDiaCanje) {
    this.cuponDiaRepository = getRepository(CuponDiaCanje);
    return await this.cuponDiaRepository.save(entity);
  }

  public isEnabledToRedeem(diasAvalidar, cupon: Cupon, userScan: User) {
    let todayWeekNumber = moment().week();
    let todayWeekYear = moment().weekYear();
    let todayDate = moment().date();
    let weekDayName = moment().locale('es').format('dddd').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();;
    let weekDayHora = moment().locale('es').format('hh:mm');
    let weekDayAvailableByCupon = cupon.promocion.dias_disponibles.map(x => x.dia);

    let countWeek = {};

    if (cupon.promocion.activo == false) {
      throw Error('Promocion not found');
    }

    // Validar que no se haya cangeado el mismo día.
    for (const diaObject of diasAvalidar) {
      let dia = diaObject.dia_canje;
      let weeknumber = moment(dia).week();
      let weekYear = moment(dia).weekYear();
      let date = moment(dia).date();

      countWeek[weeknumber] = countWeek[weeknumber] ? countWeek[weeknumber] + 1 : 1;

      if (todayWeekNumber == weeknumber && todayWeekYear == weekYear && todayDate == date) {
        console.error('NO SE CANJEA MISMO DIA');
        throw Error('ERR-CODE-10');
      }

    }

    // Validar que sea un dia disponible para el cupon.
    if (weekDayAvailableByCupon && weekDayAvailableByCupon.length > 0 && weekDayAvailableByCupon.indexOf(weekDayName) == -1) {
      console.error('NO ES UN DIA HABILITADO')
      throw Error('ERR-CODE-11');
    } else {
      if (cupon?.promocion?.dias_disponibles.length > 0) {

        let findDate = cupon.promocion.dias_disponibles.find(x => x.dia.toLowerCase() == weekDayName.toLowerCase());
        let hoy = moment();

        let horaDesde = findDate.hora_desde.split(":")[0] ? findDate.hora_desde.split(":")[0] : '00';
        let minutoDesde = findDate.hora_desde.split(":")[1] ? findDate.hora_desde.split(":")[1] : '00';
        let horaHasta = findDate.hora_hasta.split(":")[0] ? findDate.hora_hasta.split(":")[0] : '00';
        let minutoHasta = findDate.hora_hasta.split(":")[0] ? findDate.hora_hasta.split(":")[1] : '00';

        let startDate = moment(new Date()).set({ hour: Number(horaDesde), minute: Number(minutoDesde), second: 0, millisecond: 0 });
        let endDate = moment(new Date()).set({ hour: Number(horaHasta), minute: Number(minutoHasta), second: 0, millisecond: 0 });

        // Validar que se encuentre entre el rango horario valido del cupon, segun el día.
        if (!(hoy.isBefore(endDate)
          && hoy.isAfter(startDate)
          || (hoy.isSame(startDate) || hoy.isSame(endDate)))
        ) {
          console.error("HORA NO CORRECTA! :(");
          throw Error('ERR-CODE-12');
        }
      }

    }

    // Validar que no haya superado el umbral maximo de canjes por semana.
    if (countWeek[todayWeekNumber] >= cupon.promocion.nro_canje_maximo_sem) {
      console.error('NO SE CANJEA, supero el maximo por semana: ', cupon.promocion.nro_canje_maximo_sem)
      throw Error('ERR-CODE-13');
    }

    // Validar si no es un cupon generico, que la sucursal de escaneo sea la correspondiente al cupon.
    if (userScan.sucursal && cupon?.promocion?.sucursales?.length > 0) {
      let sucursalesPromocionIds = cupon?.promocion?.sucursales.map(x => x.getId());
      let userSucursalId = userScan.sucursal.getId();

      if (sucursalesPromocionIds.indexOf(userSucursalId) == -1) {
        console.error('NO SE CANJEA, sucursal no valida para la promo: ', cupon.promocion.nro_canje_maximo_sem)
        throw Error('ERR-CODE-14');
      }

    }


  }

}
