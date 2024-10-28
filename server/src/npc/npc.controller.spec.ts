import { Test, TestingModule } from '@nestjs/testing';
import { NpcController } from './npc.controller';

describe('NpcController', () => {
  let controller: NpcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NpcController],
    }).compile();

    controller = module.get<NpcController>(NpcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
