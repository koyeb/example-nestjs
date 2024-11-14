import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTierDto {
  @IsOptional()
  @IsInt()
  level?: number;

  @IsOptional()
  @IsString()
  bonus?: string;

  @IsOptional()
  npc?: number;
}
