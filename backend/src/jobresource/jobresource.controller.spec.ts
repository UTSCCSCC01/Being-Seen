import { Test, TestingModule } from '@nestjs/testing';
import { JobresourceController } from './jobresource.controller';

describe('JobresourceController', () => {
  let controller: JobresourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobresourceController],
    }).compile();

    controller = module.get<JobresourceController>(JobresourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
