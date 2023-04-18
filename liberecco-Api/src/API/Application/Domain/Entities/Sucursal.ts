import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
  Unique,
  Index,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Horario from './Horario';
import Delivery from './Delivery';
import { type } from 'os';
import User from './User';
import SucursalPresentacion from './SucursalPresentacion';
import Producto from './Producto';
import SucursalSabor from './SucursalSabor';
import Presentacion from './Presentacion';
import Turno from './Turno';
import Promocion from './Promocion';
import Novedad from './Novedad';
import Canjeable from './Canjeable';

@Entity()
export default class Sucursal extends BaseEntity {

  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  localidad: string;

  @Column()
  direccion: string;

  @Column()
  email: string;

  @Column(type => Horario)
  horario: Horario

  @Column(type => Delivery)
  delivery: Delivery

  @Column()
  facebook: string;

  @Column()
  instagram: string;

  @Column({ nullable: true })
  encuesta_link: string;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ default: false })
  deliveryTiene: boolean;

  @ManyToMany(type => Producto, { eager: true, onDelete: 'CASCADE' })
  @JoinTable({ name: "sucursal_productos" })
  productos: Producto[];

  @ManyToMany(type => User, { eager: true, onDelete: 'CASCADE' })
  @JoinTable({ name: "sucursal_usuarios" })
  usuarios: User[];

  @OneToMany(type => SucursalPresentacion, presentaciones => presentaciones.sucursal, { cascade: ['insert', 'update'] })
  presentaciones: SucursalPresentacion[];

  @OneToMany(type => SucursalSabor, sucursalSabores => sucursalSabores.sucursal, { cascade: ['insert', 'update'] })
  sabores: SucursalSabor[];

  @ManyToMany(type => Promocion, promocion => promocion.sucursales)
  @JoinTable({name: "promocion_sucursales"})
  promociones: Promocion[];

  @ManyToMany(type => Novedad, novedad => novedad.sucursales)
  @JoinTable({name: "novedad_sucursales"})
  novedades: Novedad[];

  @Column({ nullable: true })
  imagen_path: string;

  @OneToMany(type => Turno, turnos => turnos.sucursal)
  turnos: Turno[];

  @Column()
  orden: number;

  @Column({unique:true })
  urlamigable: string;

  @Column({ nullable: true })
  imagen_responsive_path: string;

  @ManyToMany(type => Canjeable, canjeable => canjeable.sucursales)
  @JoinTable({name: "canjeable_sucursales"})
  canjeables: Canjeable[];

  setId(id: number) {
    this.id = id;
  }

  getId(): number {
    return this.id;
  }

  setLocalidad(value: string) {
    this.localidad = value;
  }

  getLocalidad(): string {
    return this.localidad;
  }

  setDireccion(value: string) {
    this.direccion = value;
  }

  getDireccion(): string {
    return this.direccion;
  }

  setEmail(value: string) {
    this.email = value;
  }

  getEmail(): string {
    return this.email;
  }

  setFacebook(value: string) {
    this.facebook = value;
  }

  getFacebook(): string {
    return this.facebook;
  }

  setEncuestaLink(encuesta: string) {
    this.encuesta_link = encuesta;
  }

  getEncuestaLink() {
    return this.encuesta_link;
  }

  setLatitud(latitud: string) {
    this.latitud = latitud;
  }

  getLatitud() {
    return this.latitud;
  }

  setLongitud(longitud: string) {
    this.longitud = longitud;
  }

  getlongitud() {
    return this.longitud;
  }

  isActivo() {
    return this.activo;
  }

  setActivo(activo: boolean) {
    this.activo = activo;
  }

  setHorario(value: Horario) {
    this.horario = value;
  }

  getHorario() {
    return this.horario;
  }

  setDelivery(value: Delivery) {
    this.delivery = value;
  }

  getDelivery() {
    return this.delivery;
  }

  setDeliveryTiene(value: boolean) {
    this.deliveryTiene = value;
  }

  getDeliveryTiene() {
    return this.deliveryTiene;
  }

  setPresentaciones(value: SucursalPresentacion[]) {
    this.presentaciones = value;
  }

  getPresentaciones(){
    return this.presentaciones;
  }

  setSabores(value: SucursalSabor[]){
    this.sabores = value;
  }

  getSabores(){
    return this.sabores;
  }

  setImagenPath(value: string): void {
    this.imagen_path = value;
  }

  getImagenPath(){
    return this.imagen_path;
  }

  getOrden(): number {
    return this.orden;
  }

  setOrden(value: number): void {
    this.orden = value;
  }

  setUrlamigable(value: string): void {
    this.urlamigable = value;
  }

  getUrlamigable(): string {
    return this.urlamigable;
  }

  setImagenResponsivePath(value: string): void {
    this.imagen_responsive_path = value;
  }

  getImagenResponsivePath(){
    return this.imagen_responsive_path;
  }

  setProductos(value: Producto[]) {
    this.productos = value;
  }

  getProductos(){
    return this.productos;
  }

  getPromociones(value: Promocion[]){
    this.promociones = value;
  }

  setPromociones(){
    return this.promociones;
  }

  getNovedades(value: Novedad[]){
    this.novedades = value;
  }

  setNovedades(){
    return this.novedades;
  }

  getCanjeables(){
    return this.canjeables;
  }

  setCanjeables(value: Canjeable[]){
    this.canjeables = value;
  }
}
