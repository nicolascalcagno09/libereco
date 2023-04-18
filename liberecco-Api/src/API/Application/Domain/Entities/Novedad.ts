import BaseEntity from "./BaseEntity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import Sucursal from "./Sucursal";

@Entity()
export default class Novedad extends BaseEntity {

    @PrimaryGeneratedColumn()
    private id: number;

    @ManyToMany(type => Sucursal, sucursal => sucursal.novedades)
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

    @Column()
    visibilidad: boolean;

    @Column()
    activo: boolean;

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