import { Test, TestingModule } from '@nestjs/testing';
import { MatePriceController } from './mate-price.controller';

describe('MatePriceController', () => {
  let controller: MatePriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatePriceController],
    }).compile();

    controller = module.get<MatePriceController>(MatePriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
