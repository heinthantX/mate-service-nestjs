import { Mate } from 'src/mates/mate.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
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

  @ManyToOne(() => Mate, (mate) => mate.mateServiceRequests)
  mate: Mate;

  @ManyToOne(() => User, (user) => user.mateServiceRequests)
  user: User;
}
