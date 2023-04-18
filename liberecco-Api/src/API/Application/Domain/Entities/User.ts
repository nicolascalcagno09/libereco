import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
  Unique,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
  OneToOne,
} from 'typeorm';


import OAuth2Token from './OAuth2Token';
import BaseEntity from './BaseEntity';
import { type } from 'os';
import Sucursal from './Sucursal';


/**
 * @swagger
 *
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 */


/**
 *  @swagger
 *
 *  definitions:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        email:
 *          type: string
 *        nombre:
 *          type: string
 *        password:
 *          type: string
 *          format: password
 *        roles:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id : integer
 */

/**
 *  @swagger
 *
 *  definitions:
 *    ResponseUser:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        email:
 *          type: string
 *        nombre:
 *          type: string
 */

@Entity({ synchronize: true, name: 'usuarios' })
@Unique(['email'])
export default class User extends BaseEntity {
  protected __has_roles__: Boolean;

  protected __has_permits__: Boolean;


  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  phone: number;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  perfil: string;

  @Column({ name: 'reset_password_token', nullable: true })
  resetPasswordToken: string;

  @OneToMany(type => OAuth2Token, token => token.user , { onDelete: 'CASCADE' })
  @JoinTable()
  tokens: Promise<OAuth2Token[]>;


  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(type => Sucursal)
  sucursal: Sucursal;

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

  getPhone(): number {
    return this.phone;
  }

  setPhone(phone: number): void {
    this.phone = phone;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getSalt(): string {
    return this.salt;
  }

  setSalt(salt: string): void {
    this.salt = salt;
  }

  getResetPasswordToken(): string {
    return this.resetPasswordToken;
  }

  setResetPasswordToken(token: string): void {
    this.resetPasswordToken = token;
  }

  hasResetPasswordToken(): boolean {
    return this.resetPasswordToken !== null;
  }

  toJSON() {
    const user = Object.assign(this);
    return {
      id: this.id,
      email: this.email,
      nombre: this.nombre,
      phone: this.phone,
      perfil: this.perfil,
      sucursal: this.getSucursal()
    };
  }

  getSucursal(){
    return this.sucursal;
  }

  setSucursal(sucursal: Sucursal): void {
    this.sucursal = sucursal;
  }

  getPerfil(){
    return this.perfil;
  }

  setPerfil(value: string): void {
    this.perfil = value;
  }
}

