import { Test, TestingModule } from '@nestjs/testing';
import { JobResourceController } from './jobresource.controller';

describe('JobresourceController', () => {
  let controller: JobResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobResourceController],
    }).compile();

    controller = module.get<JobResourceController>(JobResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
