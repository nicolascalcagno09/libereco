import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  OneToMany,
  Unique,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';


import OAuth2Token from './OAuth2Token';
import BaseEntity from './BaseEntity';
import Sucursal from './Sucursal';

@Entity({ synchronize: true, name: 'usuarios_app' })
@Unique(['email', 'telefono'])
export default class UserApp extends BaseEntity {
  protected __has_roles__: Boolean;

  protected __has_permits__: Boolean;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  email: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ nullable: true })
  documento: string;

  @Column({ nullable: true })
  direccion: string;

  @Column()
  telefono: string;

  @OneToMany(type => OAuth2Token, token => token.user , { onDelete: 'CASCADE' })
  @JoinTable()
  tokens: Promise<OAuth2Token[]>;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(type => Sucursal)
  sucursal: Sucursal;

  @Column({ nullable: true })
  cumpleanios: Date;

  @Column({ nullable: true })
  genero: string;

  @Column()
  telefonoValidado: boolean;

  @Column()
  estado: string;

  @Column({ nullable: true })
  photoURL: string;

  @Column({ nullable: true })
  pushToken: string;

  @Column({ default: 0})
  puntosDisponibles: number;

  @Column({ default: false})
  emailVerified: boolean;

  @BeforeUpdate()
  @BeforeInsert()
  setUpdatedAt(date?: Date) {
    let setDate = date;
    if (typeof date === 'undefined') {
      setDate = new Date();
    }
    this.updatedAt = setDate;
  }

  getId(): number {
    return this.id;
  }

  setUid(uid: string): void {
    this.uid = uid;
  }

  getUid(): string {
    return this.uid;
  }

  setId(id: number): void {
    this.id = id;
  }

  getNombre(): string {
    return this.nombre;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getTelefono(): string {
    return this.telefono;
  }

  setTelefono(telefono: string): void {
    this.telefono = telefono;
  }

  isEmailVerified(): boolean {
    return this.emailVerified;
  }

  setEmailVerified(value: boolean): void {
    this.emailVerified = value;
  }

  toJSON() {
    const user = Object.assign(this);
    return {
      id: this.id,
      uid: this.uid,
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      genero: this.genero,
      cumpleanios: this.cumpleanios,
      telefonoValidado: this.telefonoValidado,
      estado: this.estado,
      direccion: this.direccion,
      documento: this.documento,
      puntosDisponibles: this.puntosDisponibles,
      emailVerified: this.emailVerified,
      sucursal: this.getSucursal()
    };
  }

  getSucursal(){
    return this.sucursal;
  }

  setSucursal(sucursal: Sucursal): void {
    this.sucursal = sucursal;
  }

  getPuntosDisponibles() {
    return this.puntosDisponibles;
  }

  setPuntosDisponibles(puntos: number) {
    this.puntosDisponibles = puntos;
  }
}