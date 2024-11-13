import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { World } from './world.entity';
import { WorldService } from './world.service';
import { WorldController } from './world.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([World, User])],
  providers: [WorldService],
  controllers: [WorldController],
})
export class WorldModule {}
