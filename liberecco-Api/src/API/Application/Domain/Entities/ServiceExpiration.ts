import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import BaseEntity from './BaseEntity';
import { ServiceType } from '../Enums/ServiceType';

@Entity({ synchronize: true })
export default class ServiceExpiration extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ServiceType })
  serviceType: number;

  @Column()
  expirationDate: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  setUpdatedAt() {
    let setDate = new Date();
    this.updatedAt = setDate;
  }

  getId(): number {
    return this.id;
  }

  getServiceType(): number {
    return this.serviceType;
  }
  setServiceType(serviceType: number): void {
    this.serviceType = serviceType;
  }

  getExpirationDate(): Date {
    return this.expirationDate;
  }
  setExpirationDate(expirationDate): void {
    this.expirationDate = expirationDate;
  }
}
