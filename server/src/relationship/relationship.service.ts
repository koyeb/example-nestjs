import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Relationship } from './relationship.entity';
import { CreateRelationshipDto } from './create-relationship.dto';
import { UpdateRelationshipDto } from './update-relationship.dto';
import { Tier } from '../tier/tier.entity';
import { Character } from '../character/character.entity';

@Injectable()
export class RelationshipService {
  constructor(
    @InjectRepository(Relationship)
    private readonly relationshipRepository: Repository<Relationship>,

    @InjectRepository(Tier)
    private readonly tierRepository: Repository<Tier>,

    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async create(
    createRelationshipDto: CreateRelationshipDto,
  ): Promise<Relationship> {
    const {
      npc: npcId,
      pc: pcId,
      tier: tierId,
      visibility,
    } = createRelationshipDto;

    const npc = await this.characterRepository.findOne({
      where: { id: npcId },
    });
    if (!npc) throw new NotFoundException('NPC character not found');

    const pc = await this.characterRepository.findOne({ where: { id: pcId } });
    if (!pc) throw new NotFoundException('PC character not found');

    const tier = tierId
      ? await this.tierRepository.findOne({ where: { id: tierId } })
      : null;
    if (tierId && !tier) throw new NotFoundException('Tier not found');

    const relationship = this.relationshipRepository.create({
      visibility: visibility ?? 0,
      npc,
      pc,
      tier,
    });

    return this.relationshipRepository.save(relationship);
  }

  async findAll(): Promise<Relationship[]> {
    return this.relationshipRepository.find({
      relations: ['npc', 'pc', 'tier'],
    });
  }

  async findOne(id: number): Promise<Relationship> {
    const relationship = await this.relationshipRepository.findOne({
      where: { id },
      relations: ['npc', 'pc', 'tier'],
    });
    if (!relationship) {
      throw new NotFoundException('Relationship not found');
    }
    return relationship;
  }

  async update(
    id: number,
    updateRelationshipDto: UpdateRelationshipDto,
  ): Promise<Relationship> {
    const relationship = await this.findOne(id);

    if (updateRelationshipDto.npc) {
      const npc = await this.characterRepository.findOne({
        where: { id: updateRelationshipDto.npc },
      });
      if (!npc) throw new NotFoundException('NPC character not found');
      relationship.npc = npc;
    }

    if (updateRelationshipDto.pc) {
      const pc = await this.characterRepository.findOne({
        where: { id: updateRelationshipDto.pc },
      });
      if (!pc) throw new NotFoundException('PC character not found');
      relationship.pc = pc;
    }

    if (updateRelationshipDto.tier) {
      const tier = await this.tierRepository.findOne({
        where: { id: updateRelationshipDto.tier },
      });
      if (tier) {
        relationship.tier = tier;
      } else {
        throw new NotFoundException('Tier not found');
      }
    }

    Object.assign(relationship, updateRelationshipDto);
    return this.relationshipRepository.save(relationship);
  }

  async remove(id: number): Promise<void> {
    const result = await this.relationshipRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Relationship not found');
    }
  }
}
