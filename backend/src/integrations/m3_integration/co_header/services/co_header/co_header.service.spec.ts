import { Test, TestingModule } from '@nestjs/testing';
import { CoHeaderService } from './co_header.service';

describe('CoHeaderService', () => {
  let service: CoHeaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoHeaderService],
    }).compile();

    service = module.get<CoHeaderService>(CoHeaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
