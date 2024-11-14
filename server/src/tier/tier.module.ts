import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tier } from './tier.entity';
import { TierService } from './tier.service';
import { TierController } from './tier.controller';
import { CharacterModule } from '../character/character.module'; // Import CharacterModule

@Module({
  imports: [TypeOrmModule.forFeature([Tier]), CharacterModule],
  providers: [TierService],
  controllers: [TierController],
})
export class TierModule {}
