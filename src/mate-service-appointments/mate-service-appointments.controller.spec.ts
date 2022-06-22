import { Test, TestingModule } from '@nestjs/testing';
import { MateServiceAppointmentsController } from './mate-service-appointments.controller';

describe('MateServiceAppointmentsController', () => {
  let controller: MateServiceAppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateServiceAppointmentsController],
    }).compile();

    controller = module.get<MateServiceAppointmentsController>(MateServiceAppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
