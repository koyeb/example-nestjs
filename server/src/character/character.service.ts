import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async create(characterData: Partial<Character>): Promise<Character> {
    const character = this.characterRepository.create(characterData);
    return this.characterRepository.save(character);
  }

  async findAll(): Promise<Character[]> {
    return this.characterRepository.find({
      relations: [
        'world',
        'type',
        'class',
        'secondClass',
        'species',
        'gender',
        'visibility',
      ],
    });
  }

  async findOne(id: number): Promise<Character> {
    const character = await this.characterRepository.findOne({
      where: { id },
      relations: [
        'world',
        'type',
        'class',
        'secondClass',
        'species',
        'gender',
        'visibility'
      ]
    });
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character;
  }

  async update(id: number, updateData: Partial<Character>): Promise<Character> {
    await this.characterRepository.update(id, updateData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.characterRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Character not found');
    }
  }
}
