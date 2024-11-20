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
import { CharTypeService } from './char-type.service';
import { CreateCharTypeDto } from './create-char-type.dto';
import { UpdateCharTypeDto } from './update-char-type.dto';
import { CharType } from './char-type.entity';

@Controller('char-type')
export class CharTypeController {
  constructor(private readonly charTypeService: CharTypeService) {}

  @Post()
  async create(
    @Body() createCharTypeDto: CreateCharTypeDto,
  ): Promise<CharType> {
    return this.charTypeService.create(createCharTypeDto);
  }

  @Get()
  async findAll(): Promise<CharType[]> {
    return this.charTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CharType> {
    const charType = await this.charTypeService.findOne(id);
    if (!charType) {
      throw new NotFoundException('CharType not found');
    }
    return charType;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCharTypeDto: UpdateCharTypeDto,
  ): Promise<CharType> {
    return this.charTypeService.update(id, updateCharTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.charTypeService.remove(id);
  }
}
