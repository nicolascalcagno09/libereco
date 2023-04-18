import {
  Column,
} from 'typeorm';

export default class Delivery {
  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  celular: string;

  @Column({ nullable: true })
  horario: string;

  @Column({ nullable: true })
  costo: string;

  setTelefono(telefono: string) {
    this.telefono = telefono;
  }

  getTelefono() {
    return this.telefono;
  }

  setCelular(celular: string) {
    this.celular = celular;
  }

  getCelular() {
    return this.celular;
  }

  setCosto(costo: string) {
    this.costo = costo;
  }

  getCosto() {
    return this.costo;
  }

}