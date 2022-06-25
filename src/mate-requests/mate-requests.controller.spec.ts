import { Test, TestingModule } from '@nestjs/testing';
import { MateRequestsController } from './mate-requests.controller';

describe('MateRequestsController', () => {
  let controller: MateRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateRequestsController],
    }).compile();

    controller = module.get<MateRequestsController>(MateRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
