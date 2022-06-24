import { MateServiceAppointment } from 'src/mate-service-appointments/mate-service-appointment.entity';
import { MateServiceRequest } from 'src/mate-service-requests/mate-service-request.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MatePrice } from '../mate-price/mate-price.entity';

@Entity()
export class Mate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  photoUrl: string;

  @Column()
  city: string;

  @Column({ default: 5.0 })
  rating: number;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  height: number;

  @Column()
  bodyType: string;

  @Column()
  language: string;

  @Column()
  service: string;

  @Column({ default: false })
  verified: boolean;

  @Column('time')
  time: Date;

  @Column({ default: 'online' })
  status: string;

  @Column('time')
  responseTime: Date;

  @OneToMany(() => MatePrice, (matePrice) => matePrice.mate)
  matePrices: MatePrice[];

  @OneToMany(
    () => MateServiceRequest,
    (mateServiceRequest) => mateServiceRequest.mate,
  )
  mateServiceRequests: MateServiceRequest[];

  @OneToMany(
    () => MateServiceAppointment,
    (mateServiceAppointment) => mateServiceAppointment.mate,
  )
  mateServiceAppointments: MateServiceAppointment[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted mate with email', this.email);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated mate with email', this.email);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed mate with email', this.email);
  }
}
