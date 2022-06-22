import { Test, TestingModule } from '@nestjs/testing';
import { MateServiceRequestsService } from './mate-service-requests.service';

describe('MateServiceRequestsService', () => {
  let service: MateServiceRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateServiceRequestsService],
    }).compile();

    service = module.get<MateServiceRequestsService>(MateServiceRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
