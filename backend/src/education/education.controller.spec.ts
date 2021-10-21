import { Test, TestingModule } from '@nestjs/testing';
import { EducationController } from './education.controller';

describe('EducationController', () => {
  let controller: EducationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationController],
    }).compile();

    controller = module.get<EducationController>(EducationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
