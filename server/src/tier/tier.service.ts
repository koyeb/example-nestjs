import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tier } from './tier.entity';
import { CreateTierDto } from './create-tier.dto';
import { UpdateTierDto } from './update-tier.dto';
import { Character } from '../character/character.entity';

@Injectable()
export class TierService {
  constructor(
    @InjectRepository(Tier)
    private readonly tierRepository: Repository<Tier>,

    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async create(createTierDto: CreateTierDto): Promise<Tier> {
    let npc = null;
    if (createTierDto.npc) {
      npc = await this.characterRepository.findOne({
        where: { id: createTierDto.npc },
      });
      if (!npc) {
        throw new NotFoundException('NPC not found');
      }
    }

    const tier = this.tierRepository.create({
      ...createTierDto,
      npc,
    });

    return this.tierRepository.save(tier);
  }

  async findAll(): Promise<Tier[]> {
    return this.tierRepository.find({ relations: ['npc'] });
  }

  async findOne(id: number): Promise<Tier> {
    const tier = await this.tierRepository.findOne({
      where: { id },
      relations: ['npc'],
    });
    if (!tier) {
      throw new NotFoundException('Tier not found');
    }
    return tier;
  }

  async update(id: number, updateTierDto: UpdateTierDto): Promise<Tier> {
    const tier = await this.findOne(id);

    if (updateTierDto.npc) {
      const npc = await this.characterRepository.findOne({
        where: { id: updateTierDto.npc },
      });
      if (!npc) {
        throw new NotFoundException('NPC not found');
      }
      tier.npc = npc;
    }

    Object.assign(tier, updateTierDto);
    return this.tierRepository.save(tier);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tierRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Tier not found');
    }
  }
}
