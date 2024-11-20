import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharType } from './char-type.entity';
import { CreateCharTypeDto } from './create-char-type.dto';
import { UpdateCharTypeDto } from './update-char-type.dto';

@Injectable()
export class CharTypeService {
  constructor(
    @InjectRepository(CharType)
    private charTypeRepository: Repository<CharType>,
  ) {}

  async create(createCharTypeDto: CreateCharTypeDto): Promise<CharType> {
    const charType = this.charTypeRepository.create(createCharTypeDto);
    return this.charTypeRepository.save(charType);
  }

  async findAll(): Promise<CharType[]> {
    return this.charTypeRepository.find();
  }

  async findOne(id: number): Promise<CharType> {
    const charType = await this.charTypeRepository.findOneBy({ id });
    if (!charType) {
      throw new NotFoundException('CharType not found');
    }
    return charType;
  }

  async update(
    id: number,
    updateCharTypeDto: UpdateCharTypeDto,
  ): Promise<CharType> {
    await this.charTypeRepository.update(id, updateCharTypeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.charTypeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('CharType not found');
    }
  }
} 