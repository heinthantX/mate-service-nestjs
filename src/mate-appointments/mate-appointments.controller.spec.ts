import { Test, TestingModule } from '@nestjs/testing';
import { MateAppointmentsController } from './mate-appointments.controller';

describe('MateAppointmentsController', () => {
  let controller: MateAppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateAppointmentsController],
    }).compile();

    controller = module.get<MateAppointmentsController>(MateAppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
