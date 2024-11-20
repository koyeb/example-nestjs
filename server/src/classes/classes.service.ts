import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classes } from './classes.entity';
import { CreateClassesDto } from './create-classes.dto';
import { UpdateClassesDto } from './update-classes.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private classesRepository: Repository<Classes>,
  ) {}

  async create(createClassesDto: CreateClassesDto): Promise<Classes> {
    const classes = this.classesRepository.create(createClassesDto);
    return this.classesRepository.save(classes);
  }

  async findAll(): Promise<Classes[]> {
    return this.classesRepository.find();
  }

  async findOne(id: number): Promise<Classes> {
    const classes = await this.classesRepository.findOneBy({ id });
    if (!classes) {
      throw new NotFoundException('Classes not found');
    }
    return classes;
  }

  async update(
    id: number,
    updateClassesDto: UpdateClassesDto,
  ): Promise<Classes> {
    await this.classesRepository.update(id, updateClassesDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.classesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Classes not found');
    }
  }
}
