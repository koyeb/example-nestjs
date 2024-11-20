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
import { VisibilityService } from './visibility.service';
import { CreateVisibilityDto } from './create-visibility.dto';
import { UpdateVisibilityDto } from './update-visibility.dto';
import { Visibility } from './visibility.entity';

@Controller('visibility')
export class VisibilityController {
  constructor(private readonly visibilityService: VisibilityService) {}

  @Post()
  async create(
    @Body() createVisibilityDto: CreateVisibilityDto,
  ): Promise<Visibility> {
    return this.visibilityService.create(createVisibilityDto);
  }

  @Get()
  async findAll(): Promise<Visibility[]> {
    return this.visibilityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Visibility> {
    const visibility = await this.visibilityService.findOne(id);
    if (!visibility) {
      throw new NotFoundException('Visibility not found');
    }
    return visibility;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVisibilityDto: UpdateVisibilityDto,
  ): Promise<Visibility> {
    return this.visibilityService.update(id, updateVisibilityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.visibilityService.remove(id);
  }
}
