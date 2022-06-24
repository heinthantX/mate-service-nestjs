import { Test, TestingModule } from '@nestjs/testing';
import { MatesAuthService } from './mates-auth.service';

describe('MatesAuthService', () => {
  let service: MatesAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatesAuthService],
    }).compile();

    service = module.get<MatesAuthService>(MatesAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
