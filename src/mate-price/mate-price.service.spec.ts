import { Test, TestingModule } from '@nestjs/testing';
import { MatePriceService } from './mate-price.service';

describe('MatePriceService', () => {
  let service: MatePriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatePriceService],
    }).compile();

    service = module.get<MatePriceService>(MatePriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
