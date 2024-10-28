import { Test, TestingModule } from '@nestjs/testing';
import { NpcService } from './npc.service';

describe('NpcService', () => {
  let service: NpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NpcService],
    }).compile();

    service = module.get<NpcService>(NpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
