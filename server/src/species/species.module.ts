import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './species.entity';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Species])],
  providers: [SpeciesService],
  controllers: [SpeciesController],
})
export class SpeciesModule {}
