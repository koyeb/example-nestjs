// dto/create-relationship.dto.ts
import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateRelationshipDto {
  @IsOptional()
  @IsInt()
  visibility?: number = 0;

  @IsOptional()
  @IsNumber()
  tier?: number;

  @IsNumber()
  npc: number;

  @IsNumber()
  pc: number;
}
