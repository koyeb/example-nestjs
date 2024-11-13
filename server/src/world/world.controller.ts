import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorldService } from './world.service';
import { CreateWorldDto } from './create-world.dto';
import { User } from '../user/user.entity';
import { World } from './world.entity';
import { UpdateWorldDto } from './update-world.dto';

@Controller('world')
export class WorldController {
  constructor(
    private readonly worldService: WorldService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject User repository
  ) {}

  @Post(':userId')
  async createWorld(
    @Body() createWorldDto: CreateWorldDto,
    @Param('userId') userId: number,
  ): Promise<World> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.worldService.createWorld(createWorldDto, user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<World> {
    return this.worldService.findOne(id);
  }

  @Put(':id')
  async updateWorld(
    @Param('id') id: number,
    @Body() updateWorldDto: UpdateWorldDto,
  ): Promise<World> {
    return this.worldService.updateWorld(id, updateWorldDto);
  }

  @Delete(':id')
  async deleteWorld(@Param('id') id: number): Promise<void> {
    return this.worldService.deleteWorld(id);
  }

  @Get()
  async findAll(): Promise<World[]> {
    return this.worldService.findAll();
  }
}
