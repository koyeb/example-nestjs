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
import { ClassesService } from './classes.service';
import { CreateClassesDto } from './create-classes.dto';
import { UpdateClassesDto } from './update-classes.dto';
import { Classes } from './classes.entity';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  async create(@Body() createClassesDto: CreateClassesDto): Promise<Classes> {
    return this.classesService.create(createClassesDto);
  }

  @Get()
  async findAll(): Promise<Classes[]> {
    return this.classesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Classes> {
    const classes = await this.classesService.findOne(id);
    if (!classes) {
      throw new NotFoundException('Classes not found');
    }
    return classes;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClassesDto: UpdateClassesDto,
  ): Promise<Classes> {
    return this.classesService.update(id, updateClassesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.classesService.remove(id);
  }
}
