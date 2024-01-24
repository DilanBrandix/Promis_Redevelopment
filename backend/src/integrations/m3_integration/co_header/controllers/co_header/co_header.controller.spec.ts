import { Test, TestingModule } from '@nestjs/testing';
import { CoHeaderController } from './co_header.controller';

describe('CoHeaderController', () => {
  let controller: CoHeaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoHeaderController],
    }).compile();

    controller = module.get<CoHeaderController>(CoHeaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
