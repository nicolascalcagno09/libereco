import BaseEntity from "./BaseEntity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import Sucursal from "./Sucursal";
import PromocionDia from "./PromocionDia";

@Entity()
export default class Promocion extends BaseEntity {

    @PrimaryGeneratedColumn()
    private id: number;

    @ManyToMany(type => Sucursal, sucursal => sucursal.promociones)
    sucursales: Sucursal[];

    @Column()
    titulo: string;

    @Column()
    subtitulo: string;

    @Column()
    descripcion: string;

    @Column({ nullable: true })
    imagen_path: string;

    @Column()
    desde: string;

    @Column()
    hasta: string;

    @Column({ type: "float" })
    equivalente: number;

    @Column()
    puntos: number;

    @Column()
    visibilidad: boolean;

    @Column()
    activo: boolean;

    @OneToMany(type => PromocionDia, pd => pd.promocion, { eager: true, cascade: true })
    dias_disponibles: PromocionDia[];

    @Column({ default: 1 })
    nro_canje_maximo_sem: number;

    setId(id: number) {
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    setTitulo(titulo: string) {
        this.titulo = titulo;
    }

    getTitulo(): string {
        return this.titulo;
    }

    setSubtitulo(subtitulo: string) {
        this.subtitulo = subtitulo;
    }

    getSubtitulo(): string {
        return this.subtitulo;
    }

    setDescripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

    getDescripcion(): string {
        return this.descripcion;
    }

    setImagenPath(imagenPath: string) {
        this.imagen_path = imagenPath;
    }

    getImagenPath(): string {
        return this.imagen_path;
    }

    setEquivalente(equivalente: number) {
        this.equivalente = equivalente;
    }

    getEquivalente(): number {
        return this.equivalente;
    }

    setPuntos(puntos: number) {
        this.puntos = puntos;
    }

    getPuntos(): number {
        return this.puntos;
    }

    setVisibilidad(visibilidad: boolean) {
        this.visibilidad = visibilidad;
    }

    getVisibilidad() {
        return this.visibilidad;
    }

    setActivo(activo: boolean) {
        this.activo = activo;
    }

    getActivo() {
        return this.activo;
    }

    setDesde(value: string): void {
        this.desde = value;
    }

    getHasta() {
        return this.hasta;
    }

    setHasta(value: string): void {
        this.hasta = value;
    }

    setSucursales(value: Sucursal[]): void {
        this.sucursales = value;
    }

    getSucursales() {
        return this.sucursales;
    }
}