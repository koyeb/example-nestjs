import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tier } from './tier.entity';
import { Character } from '../character/character.entity';
import { TierService } from './tier.service';
import { TierController } from './tier.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tier, Character])],
  providers: [TierService],
  controllers: [TierController],
})
export class TierModule {}
