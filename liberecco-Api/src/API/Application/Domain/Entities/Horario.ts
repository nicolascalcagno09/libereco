import {
  Column,
} from 'typeorm';

export default class Horario {
  @Column({ nullable: false })
  apertura: string;

  @Column({ nullable: false })
  cierre: string;

  @Column({ nullable: false })
  informacion: string;

  setApertura(apertura: string) {
    this.apertura = apertura;
  }

  getApertura() {
    return this.apertura;
  }

  setCierre(cierre: string) {
    this.cierre = cierre;
  }

  getCierre() {
    return this.cierre;
  }

  setInformacion(informacion: string) {
    this.informacion = informacion;
  }

  getInformacion() {
    return this.informacion;
  }
  
}