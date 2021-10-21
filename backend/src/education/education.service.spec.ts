import { Test, TestingModule } from '@nestjs/testing';
import { EducationService } from './education.service';

describe('EducationService', () => {
  let service: EducationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationService],
    }).compile();

    service = module.get<EducationService>(EducationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
