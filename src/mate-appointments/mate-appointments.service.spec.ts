import { Test, TestingModule } from '@nestjs/testing';
import { MateAppointmentsService } from './mate-appointments.service';

describe('MateAppointmentsService', () => {
  let service: MateAppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateAppointmentsService],
    }).compile();

    service = module.get<MateAppointmentsService>(MateAppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
