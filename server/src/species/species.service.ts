import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Species } from './species.entity';
import { CreateSpeciesDto } from './create-species.dto';
import { UpdateSpeciesDto } from './update-species.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) {}

  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const species = this.speciesRepository.create(createSpeciesDto);
    return this.speciesRepository.save(species);
  }

  async findAll(): Promise<Species[]> {
    return this.speciesRepository.find();
  }

  async findOne(id: number): Promise<Species> {
    const species = await this.speciesRepository.findOneBy({ id });
    if (!species) {
      throw new NotFoundException('Species not found');
    }
    return species;
  }

  async update(
    id: number,
    updateSpeciesDto: UpdateSpeciesDto,
  ): Promise<Species> {
    await this.speciesRepository.update(id, updateSpeciesDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.speciesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Species not found');
    }
  }
}
