import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TierService } from './tier.service';
import { CreateTierDto } from './create-tier.dto';
import { UpdateTierDto } from './update-tier.dto';
import { Tier } from './tier.entity';

@Controller('tier')
export class TierController {
  constructor(private readonly tierService: TierService) {}

  @Post()
  async create(@Body() createTierDto: CreateTierDto): Promise<Tier> {
    return this.tierService.create(createTierDto);
  }

  @Get()
  async findAll(): Promise<Tier[]> {
    return this.tierService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tier> {
    const tier = await this.tierService.findOne(id);
    if (!tier) {
      throw new NotFoundException('Tier not found');
    }
    return tier;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTierDto: UpdateTierDto,
  ): Promise<Tier> {
    return this.tierService.update(id, updateTierDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.tierService.remove(id);
  }
}
