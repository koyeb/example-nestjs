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
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './create-species.dto';
import { UpdateSpeciesDto } from './update-species.dto';
import { Species } from './species.entity';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  async create(@Body() createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  async findAll(): Promise<Species[]> {
    return this.speciesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Species> {
    const species = await this.speciesService.findOne(id);
    if (!species) {
      throw new NotFoundException('Species not found');
    }
    return species;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSpeciesDto: UpdateSpeciesDto,
  ): Promise<Species> {
    return this.speciesService.update(id, updateSpeciesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.speciesService.remove(id);
  }
}
