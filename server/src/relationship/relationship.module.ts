import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relationship } from './relationship.entity';
import { RelationshipService } from './relationship.service';
import { RelationshipController } from './relationship.controller';
import { Tier } from '../tier/tier.entity';
import { Character } from '../character/character.entity';
import { Visibility } from '../visibility/visibility.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Relationship, Tier, Character, Visibility]),
  ],
  providers: [RelationshipService],
  controllers: [RelationshipController],
})
export class RelationshipModule {}
