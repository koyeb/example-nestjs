import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NPC } from './npc.entity';

@Injectable()
export class NpcService {
  constructor(
    @InjectRepository(NPC)
    private npcRepository: Repository<NPC>,
  ) {}

  async create(npcData: Partial<NPC>): Promise<NPC> {
    const npc = this.npcRepository.create(npcData);
    return this.npcRepository.save(npc);
  }

  async findAll(): Promise<NPC[]> {
    return this.npcRepository.find();
  }

  async findOne(id: number): Promise<NPC> {
    const npc = await this.npcRepository.findOneBy({ id });
    if (!npc) {
      throw new NotFoundException('NPC not found');
    }
    return npc;
  }

  async update(id: number, updateData: Partial<NPC>): Promise<NPC> {
    await this.npcRepository.update(id, updateData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.npcRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('NPC not found');
    }
  }
}
