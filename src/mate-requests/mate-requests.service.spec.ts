import { Test, TestingModule } from '@nestjs/testing';
import { MateRequestsService } from './mate-requests.service';

describe('MateRequestsService', () => {
  let service: MateRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateRequestsService],
    }).compile();

    service = module.get<MateRequestsService>(MateRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
