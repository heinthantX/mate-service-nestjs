import { time } from 'console';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Mate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  photoUrl: string;

  @Column()
  city: string;

  @Column()
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

  @Column()
  status: string;

  @Column('time')
  reponseTime: Date;
}
