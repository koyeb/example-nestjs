// dto/create-relationship.dto.ts
import { IsOptional, IsNumber } from 'class-validator';

export class CreateRelationshipDto {
  @IsOptional()
  @IsNumber()
  visibility?: number = 0;

  @IsOptional()
  @IsNumber()
  tier?: number;

  @IsNumber()
  npc: number;

  @IsNumber()
  pc: number;
}
