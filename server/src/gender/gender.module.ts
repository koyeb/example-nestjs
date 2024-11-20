import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './gender.entity';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  providers: [GenderService],
  controllers: [GenderController],
})
export class GenderModule {}
