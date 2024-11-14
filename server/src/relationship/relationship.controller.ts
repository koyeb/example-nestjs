import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RelationshipService } from './relationship.service';
import { CreateRelationshipDto } from './create-relationship.dto';
import { UpdateRelationshipDto } from './update-relationship.dto';
import { Relationship } from './relationship.entity';

@Controller('relationship')
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  @Post()
  async create(
    @Body() createRelationshipDto: CreateRelationshipDto,
  ): Promise<Relationship> {
    return this.relationshipService.create(createRelationshipDto);
  }

  @Get()
  async findAll(): Promise<Relationship[]> {
    return this.relationshipService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Relationship> {
    return this.relationshipService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRelationshipDto: UpdateRelationshipDto,
  ): Promise<Relationship> {
    return this.relationshipService.update(id, updateRelationshipDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.relationshipService.remove(id);
  }
}
