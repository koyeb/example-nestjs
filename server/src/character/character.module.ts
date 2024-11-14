import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharacterService],
  controllers: [CharacterController],
  exports: [TypeOrmModule],
})
export class CharacterModule {}
