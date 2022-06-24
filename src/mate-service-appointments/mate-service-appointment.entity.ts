import { MateServiceRequest } from 'src/mate-service-requests/mate-service-request.entity';
import { Mate } from 'src/mates/mate.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MateServiceAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'appiontment' })
  status: string;

  @OneToOne(() => MateServiceRequest)
  @JoinColumn()
  mateServiceRequest: MateServiceRequest;

  @ManyToOne(() => Mate, (mate) => mate.mateServiceAppointments)
  mate: Mate;
}
