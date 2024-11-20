import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './gender.entity';
import { CreateGenderDto } from './create-gender.dto';
import { UpdateGenderDto } from './update-gender.dto';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private genderRepository: Repository<Gender>,
  ) {}

  async create(createGenderDto: CreateGenderDto): Promise<Gender> {
    const gender = this.genderRepository.create(createGenderDto);
    return this.genderRepository.save(gender);
  }

  async findAll(): Promise<Gender[]> {
    return this.genderRepository.find();
  }

  async findOne(id: number): Promise<Gender> {
    const gender = await this.genderRepository.findOneBy({ id });
    if (!gender) {
      throw new NotFoundException('Gender not found');
    }
    return gender;
  }

  async update(id: number, updateGenderDto: UpdateGenderDto): Promise<Gender> {
    await this.genderRepository.update(id, updateGenderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.genderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Gender not found');
    }
  }
}
