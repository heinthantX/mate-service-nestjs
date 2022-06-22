import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mate } from 'src/mates/mate.entity';

@Entity()
export class MatePrice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mate, (mate) => mate.matePrice)
  mate: Mate;

  @Column('time')
  duration: Date;

  @Column()
  price: number;
}
