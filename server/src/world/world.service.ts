import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { World } from './world.entity';
import { CreateWorldDto } from './create-world.dto';
import { User } from '../user/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateWorldDto } from './update-world.dto';

@Injectable()
export class WorldService {
  constructor(
    @InjectRepository(World)
    private readonly worldRepository: Repository<World>,
  ) {}

  async createWorld(
    createWorldDto: CreateWorldDto,
    user: User,
  ): Promise<World> {
    const world = this.worldRepository.create({ ...createWorldDto, user });
    return this.worldRepository.save(world);
  }

  async findOne(id: number): Promise<World> {
    const world = await this.worldRepository.findOne({ where: { id } });
    if (!world) {
      throw new NotFoundException('World not found');
    }
    return world;
  }

  async updateWorld(
    id: number,
    updateWorldDto: UpdateWorldDto,
  ): Promise<World> {
    const world = await this.findOne(id);
    Object.assign(world, updateWorldDto);
    return this.worldRepository.save(world);
  }

  async deleteWorld(id: number): Promise<void> {
    const result = await this.worldRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('World not found');
    }
  }

  async findAll(): Promise<World[]> {
    return this.worldRepository.find();
  }
}
