import { Test, TestingModule } from '@nestjs/testing';
import { JobresourceService } from './jobresource.service';

describe('JobresourceService', () => {
  let service: JobresourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobresourceService],
    }).compile();

    service = module.get<JobresourceService>(JobresourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
