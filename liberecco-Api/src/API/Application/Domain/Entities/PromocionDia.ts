import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
} from 'typeorm';

import BaseEntity from './BaseEntity';
import Promocion from './Promocion';
import Sabor from './Sabor';

@Entity()
export default class PromocionDia extends BaseEntity {

    @PrimaryGeneratedColumn()
    private id: number;

    @ManyToOne(type => Promocion)
    promocion: Promocion;

    @Column()
    dia: string;

    @Column()
    hora_desde: string;

    @Column()
    hora_hasta: string;

    setDia(dia: string): void {
        this.dia = dia;
    }

    setId(id: number) {
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    getDia() {
        return this.dia;
    }

    setHoraDesde(horaDesde) {
        this.hora_desde = horaDesde;
    }

    getHoraDesde() {
        return this.hora_desde;
    }

    setHoraHasta(horaHasta) {
        this.hora_hasta = horaHasta;
    }

    getHoraHasta() {
        return this.hora_hasta;
    }
    
}
