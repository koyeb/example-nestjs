import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visibility } from './visibility.entity';
import { VisibilityService } from './visibility.service';
import { VisibilityController } from './visibility.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Visibility])],
  providers: [VisibilityService],
  controllers: [VisibilityController],
})
export class VisibilityModule {}
