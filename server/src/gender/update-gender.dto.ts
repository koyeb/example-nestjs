import { IsString, IsOptional } from 'class-validator';

export class UpdateGenderDto {
  @IsOptional()
  @IsString()
  desc?: string;
}
