import { IsString } from 'class-validator';

export class CreateSpeciesDto {
  @IsString()
  desc: string;
}
