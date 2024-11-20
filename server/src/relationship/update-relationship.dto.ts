import { IsOptional, IsNumber } from 'class-validator';

export class UpdateRelationshipDto {
  @IsOptional()
  @IsNumber()
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
