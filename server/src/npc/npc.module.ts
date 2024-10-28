import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NPC } from './npc.entity';
import { NpcService } from './npc.service';
import { NpcController } from './npc.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NPC])],
  providers: [NpcService],
  controllers: [NpcController],
})
export class NpcModule {}
