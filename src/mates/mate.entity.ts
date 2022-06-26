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
import { MateRequest } from '../mate-requests/mate-request.entity';
import { MateAppointment } from '../mate-appointments/mate-appointment.entity';
import { Message } from '../messages/message.entiy';

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

  @Column({ default: true })
  online: boolean;

  @Column('time')
  response_time: Date;

  @OneToMany(() => MatePrice, (matePrice) => matePrice.mate)
  matePrices: MatePrice[];

  @OneToMany(() => MateRequest, (mateRequest) => mateRequest.mate)
  mateRequests: MateRequest[];

  @OneToMany(() => MateAppointment, (mateAppointment) => mateAppointment.mate)
  mateAppointments: MateAppointment[];

  @OneToMany(() => Message, (message) => message.mate)
  messages: Message[];

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
