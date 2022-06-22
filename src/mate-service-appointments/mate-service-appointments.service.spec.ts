import { Test, TestingModule } from '@nestjs/testing';
import { MateServiceAppointmentsService } from './mate-service-appointments.service';

describe('MateServiceAppointmentsService', () => {
  let service: MateServiceAppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateServiceAppointmentsService],
    }).compile();

    service = module.get<MateServiceAppointmentsService>(MateServiceAppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
