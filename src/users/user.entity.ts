import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
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
