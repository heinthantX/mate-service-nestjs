import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MateServiceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column('time')
  time: Date;

  @Column('time')
  duration: Date;

  @Column()
  price: number;

  @Column()
  specialRequest: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({ default: 'pending' })
  status: string;
}
