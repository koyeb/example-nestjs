import { IsString } from 'class-validator';

export class CreateVisibilityDto {
  @IsString()
  desc: string;
}
