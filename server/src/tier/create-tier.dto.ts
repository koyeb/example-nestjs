import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTierDto {
  @IsInt()
  level: number;

  @IsOptional()
  @IsString()
  bonus?: string;

  @IsOptional()
  npc?: number;
}
