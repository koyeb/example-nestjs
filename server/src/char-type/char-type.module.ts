import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharType } from './char-type.entity';
import { CharTypeService } from './char-type.service';
import { CharTypeController } from './char-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CharType])],
  providers: [CharTypeService],
  controllers: [CharTypeController],
})
export class CharTypeModule {} 