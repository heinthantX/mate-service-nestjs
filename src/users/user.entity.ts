import { userInfo } from 'os';
import { MateServiceRequest } from 'src/mate-service-requests/mate-service-request.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

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
  userType: string;

  @OneToMany(
    () => MateServiceRequest,
    (mateServiceRequest) => mateServiceRequest.user,
  )
  mateServiceRequests: MateServiceRequest[];

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
