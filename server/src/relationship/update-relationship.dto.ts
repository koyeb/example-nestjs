import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class UpdateRelationshipDto {
  @IsOptional()
  @IsInt()
  visibility?: number;

  @IsOptional()
  @IsNumber()
  tier?: number;

  @IsOptional()
  @IsNumber()
  npc?: number;

  @IsOptional()
  @IsNumber()
  pc?: number;
}
