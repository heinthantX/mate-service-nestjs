import { MateRequest } from '../mate-requests/mate-request.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Message } from '../messages/message.entiy';
import { MateAppointment } from '../mate-appointments/mate-appointment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ default: 'free' })
  user_type: string;

  @OneToMany(() => MateRequest, (mateRequest) => mateRequest.user)
  mateRequests: MateRequest[];

  @OneToMany(() => MateAppointment, (mateAppointment) => mateAppointment.user)
  mateAppointments: MateAppointment[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with email', this.email);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with email', this.email);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with email', this.email);
  }
}
