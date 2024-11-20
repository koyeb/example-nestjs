import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './create-gender.dto';
import { UpdateGenderDto } from './update-gender.dto';
import { Gender } from './gender.entity';

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  async create(@Body() createGenderDto: CreateGenderDto): Promise<Gender> {
    return this.genderService.create(createGenderDto);
  }

  @Get()
  async findAll(): Promise<Gender[]> {
    return this.genderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Gender> {
    const gender = await this.genderService.findOne(id);
    if (!gender) {
      throw new NotFoundException('Gender not found');
    }
    return gender;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGenderDto: UpdateGenderDto,
  ): Promise<Gender> {
    return this.genderService.update(id, updateGenderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.genderService.remove(id);
  }
}
