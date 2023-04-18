import NotFoundEntityException from '../../Exceptions/NotFoundEntityException';
import Promocion from '../../Domain/Entities/Promocion';
import { Brackets, getRepository, LessThan, Repository } from 'typeorm';
import Cupon from '../../Domain/Entities/Cupon';
import Sucursal from '../../Domain/Entities/Sucursal';
import moment from 'moment';
import { sendSlack } from '../../../Common/SendSlack';
import { error } from '../../../Common/Result';
const os = require("os");


/**
 * @package PromocionServices
 * @author Prixel
 * @email <contacto@prixel.com>
 */
export default class PromocionServices {
  private promocionRepository: Repository<Promocion>;
  private dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  constructor() {
  }

  public async getAll() {
    this.promocionRepository = getRepository(Promocion);
    let promociones = await this.promocionRepository.find({ where: { activo: true } });

    for (const promocion of promociones) {
      if (promocion.dias_disponibles && promocion.dias_disponibles.length > 0) {
        try {
          let nextDay = this.getNextDay(promocion.dias_disponibles);
          promocion.desde = moment().add(nextDay.count, "days").set({ hour: +nextDay.dia.hora_desde.split(":")[0], minute: +nextDay.dia.hora_desde.split(":")[1], second: 0, millisecond: 0 }).format('DD/MM/YYYY HH:mm');
        } catch (error) {
          this.sendGetNextDayErrorToSlack(error, promocion, promocion.dias_disponibles);
        }
      }
    }

    return promociones;
  }

  public async findOne(conditions) {
    this.promocionRepository = getRepository(Promocion);
    return await this.promocionRepository.findOne(conditions);
  }

  public async getById(id: number) {
    this.promocionRepository = getRepository(Promocion);
    const promocion = await this.promocionRepository.createQueryBuilder('promocion')
      .leftJoin('promocion.sucursales', 'sucursal')
      .leftJoinAndSelect('promocion.dias_disponibles', 'dias_disponibles')
      .addSelect(['sucursal.id', 'sucursal.localidad', 'sucursal.direccion'])
      .where('promocion.id = :id', { id })
      .getOne()

    if (!promocion) {
      throw new NotFoundEntityException(`Promocion with id: ${id} not found`);
    }

    return promocion;
  }

  public async store(promocion: Promocion) {
    this.promocionRepository = getRepository(Promocion);
    return await this.promocionRepository.save(promocion);
  }

  public async update(promocion: Promocion) {
    this.promocionRepository = getRepository(Promocion);

    const affected = await this.promocionRepository.createQueryBuilder()
      .update(Promocion)
      .set(promocion)
      .where('id = :id', { id: promocion.getId() })
      .execute();

    return affected;
  }

  public async delete(id: number) {
    this.promocionRepository = getRepository(Promocion);
    const affected = await this.promocionRepository.createQueryBuilder()
      .update(Promocion)
      .set({ activo: false })
      .where('id = :id', { id: id })
      .execute();

    return affected;
  }

  public async getOneById(id: number) {
    this.promocionRepository = getRepository(Promocion);
    const promocion = await this.promocionRepository.findOne({ where: { id }, relations: ['sucursales'] });

    if (!promocion) {
      throw new NotFoundEntityException(`Promocion with id: ${id} not found`);
    }

    return promocion;
  }

  public async getBySucursalId(id: number, usuarioId?: number) {
    console.log(usuarioId);
    this.promocionRepository = getRepository(Promocion);
    const cuponeRepository = getRepository(Cupon);

    const promociones = await this.promocionRepository.createQueryBuilder('promocion')
      .leftJoin(
        'promocion.sucursales',
        'sucursal')
      .leftJoinAndSelect('promocion.dias_disponibles', 'dias_disponibles')
      .where('STR_TO_DATE(promocion.hasta, "%d/%m/%Y %T") > NOW()')
      .andWhere(new Brackets(qb => {
        qb.where('promocion.visibilidad = :visibilidad AND promocion.activo = :activo AND sucursal.id IS NULL', { visibilidad: true, activo: true })
          .orWhere('promocion.activo = :activo AND sucursal.id = :id', { activo: true, id });
      }))
      // .andWhere('promocion.visibilidad = :visibilidad AND sucursal.id IS NULL', { visibilidad: true })

      .orderBy("STR_TO_DATE(promocion.desde, '%d/%m/%Y %T')", "ASC") /*Pasamos el string a Date con la hora incluida */
      .disableEscaping()
      .getMany();

    let cuponesByUser;
    if (usuarioId && promociones.length) {
      let promocionesIds = promociones.map((x: Promocion) => x.getId());
      cuponesByUser = await cuponeRepository.query(`SELECT x.* FROM lib_cupon x
        WHERE usuarioAppId = ${usuarioId} AND promocionId IN (${promocionesIds.join(',')})`);

      for (const promocion of promociones) {
        let find = cuponesByUser.find((x) => x.promocionId == promocion.getId() && x.estado == 'OBTENIDO');
        if (find) {
          promocion["cupon_estado"] = find.estado;
        } else {
          promocion["cupon_estado"] = false;
        }

        if (promocion.dias_disponibles && promocion.dias_disponibles.length > 0) {
          try {
            let nextDay = this.getNextDay(promocion.dias_disponibles);
            promocion.desde = moment().add(nextDay.count, "days").set({ hour: +nextDay.dia.hora_desde.split(":")[0], minute: +nextDay.dia.hora_desde.split(":")[1], second: 0, millisecond: 0 }).format('DD/MM/YYYY HH:mm');
          } catch (error) {
            this.sendGetNextDayErrorToSlack(error, promocion, promocion.dias_disponibles);
          }

        }

      }
    }

    return promociones;
  }

  public async getAllGenerics() {
    this.promocionRepository = getRepository(Promocion);

    const promociones = await this.promocionRepository.createQueryBuilder('promocion')
      .leftJoin(
        'promocion.sucursales',
        'sucursal')
      .leftJoinAndSelect('promocion.dias_disponibles', 'dias_disponibles')
      .where('STR_TO_DATE(promocion.hasta, "%d/%m/%Y %T") > NOW()')
      .andWhere('promocion.activo = :activo AND sucursal.id IS NULL', { activo: true })
      .orderBy("STR_TO_DATE(promocion.desde, '%d/%m/%Y %T')", "ASC") /*Pasamos el string a Date con la hora incluida */
      .getMany();

    for (const promocion of promociones) {
      if (promocion.dias_disponibles && promocion.dias_disponibles.length > 0) {
        try {
          let nextDay = this.getNextDay(promocion.dias_disponibles);
          promocion.desde = moment().add(nextDay.count, "days").set({ hour: +nextDay.dia.hora_desde.split(":")[0], minute: +nextDay.dia.hora_desde.split(":")[1], second: 0, millisecond: 0 }).format('DD/MM/YYYY HH:mm');
        } catch (error) {
          this.sendGetNextDayErrorToSlack(error, promocion, promocion.dias_disponibles);
        }
      }
    }

    return promociones;
  }

  public removeDiasDisponibles(promocionId) {
    this.promocionRepository = getRepository(Promocion);

    this.promocionRepository.query(`DELETE FROM lib_promocion_dia WHERE promocionId = ${promocionId};`)

  }

  getNextDay(diasDisponibles: DiasDisponibles[]) {
    let diasDisponiblesNames = diasDisponibles.map(x => x.dia);
    let dayName = moment(new Date(), 'DD-MM-YYYY').locale('es').format('dddd');
    dayName = dayName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let dayHora = moment().locale('es').format('HH:mm');

    let findDay = diasDisponibles.find(x => x.dia.toLowerCase() == dayName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() && x.hora_hasta >= dayHora);
    if (findDay) return { count: 0, dia: findDay } as DiasDisponiblesDTO;

    let i = 0; // Index para el primer while dias posteriores a hoy
    let ib = 0; // Index para el segundo while dias anteriores a hoy
    // Index del dia de hoy
    let findDayIndexOf = this.dias.findIndex(x => x.toLowerCase() == dayName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
    let tmpDiasAfter = Object.assign([], this.dias).slice(findDayIndexOf)
    let tmpDiasBefore = Object.assign([], this.dias).slice(0, findDayIndexOf)
    let foundBefore = false;
    while (tmpDiasAfter.length != i &&
      !(tmpDiasAfter[i] != dayName && diasDisponiblesNames.indexOf(tmpDiasAfter[i]) != -1)
      && !diasDisponibles.find(x => x.dia.toLowerCase() == dayName && x.hora_hasta >= dayHora)) {
      i++;
    }

    // No esta dentro de los dias posteriores, busco en los anteriores.
    if (tmpDiasAfter.length == i) {
      foundBefore = true;
      while (tmpDiasBefore.length != ib && !(tmpDiasBefore[ib] != dayName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() && diasDisponiblesNames.indexOf(tmpDiasBefore[ib]) != -1)) {
        ib++;
        i++;
      }
    }

    // Termina el proceso, Selecciono el nombre del proximo dia
    let nextDayName = foundBefore ? tmpDiasBefore[ib] : tmpDiasAfter[i];
    // Busco las horas del proximo dia.
    let findDayByName = diasDisponibles.find(x => x.dia.toLowerCase() == nextDayName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
    let result: DiasDisponiblesDTO = {
      count: i,
      dia: findDayByName
    };
    return result;
  }

  sendGetNextDayErrorToSlack(err, promocion, dias_disponibles) {
    let errorLog =
      "Details: \n" +
      `HOST ==> ${os.hostname()}\n` +
      `File ==> ${this.constructor.name}\n` +
      `Error_Message ==> ${err}\n` +
      `Internal_Error_stack ==> ${err.stack}\n` +
      `Promoción_Id ==> ${promocion.id}\n` +
      `Dias_Disponibles ==> ${JSON.stringify(dias_disponibles)}\n`;

    sendSlack("Libereco Alert (Get Next Day)", errorLog, "/services/T9FN6A9CJ/B03EAC89GKY/AALB0SNSsUn3AaI5oh66c7fX")
  }

}


interface DiasDisponibles {
  dia: string,
  hora_desde: string,
  hora_hasta: string
}

interface DiasDisponiblesDTO {
  count: number,
  dia: DiasDisponibles
}