import { Test, TestingModule } from '@nestjs/testing';
import { MateServiceRequestsController } from './mate-service-requests.controller';

describe('MateServiceRequestsController', () => {
  let controller: MateServiceRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateServiceRequestsController],
    }).compile();

    controller = module.get<MateServiceRequestsController>(MateServiceRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
