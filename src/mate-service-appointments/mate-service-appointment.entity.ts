import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MateServiceAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'appiontment' })
  status: string;
}
