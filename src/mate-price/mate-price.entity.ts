import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mate } from '../mates/mate.entity';

@Entity()
export class MatePrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('time')
  duration: Date;

  @Column()
  price: number;

  @ManyToOne(() => Mate, (mate) => mate.matePrices, { onDelete: 'CASCADE' })
  mate: Mate;
}
