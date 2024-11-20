import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visibility } from './visibility.entity';
import { CreateVisibilityDto } from './create-visibility.dto';
import { UpdateVisibilityDto } from './update-visibility.dto';

@Injectable()
export class VisibilityService {
  constructor(
    @InjectRepository(Visibility)
    private visibilityRepository: Repository<Visibility>,
  ) {}

  async create(createVisibilityDto: CreateVisibilityDto): Promise<Visibility> {
    const visibility = this.visibilityRepository.create(createVisibilityDto);
    return this.visibilityRepository.save(visibility);
  }

  async findAll(): Promise<Visibility[]> {
    return this.visibilityRepository.find();
  }

  async findOne(id: number): Promise<Visibility> {
    const visibility = await this.visibilityRepository.findOneBy({ id });
    if (!visibility) {
      throw new NotFoundException('Visibility not found');
    }
    return visibility;
  }

  async update(
    id: number,
    updateVisibilityDto: UpdateVisibilityDto,
  ): Promise<Visibility> {
    await this.visibilityRepository.update(id, updateVisibilityDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.visibilityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Visibility not found');
    }
  }
}
