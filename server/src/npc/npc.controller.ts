import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { NpcService } from './npc.service';
import { NPC } from './npc.entity';

@Controller('npc')
export class NpcController {
  constructor(private readonly npcService: NpcService) {}

  @Post()
  create(@Body() npcData: Partial<NPC>): Promise<NPC> {
    return this.npcService.create(npcData);
  }

  @Get()
  findAll(): Promise<NPC[]> {
    return this.npcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<NPC> {
    return this.npcService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<NPC>,
  ): Promise<NPC> {
    return this.npcService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.npcService.delete(id);
  }
}
