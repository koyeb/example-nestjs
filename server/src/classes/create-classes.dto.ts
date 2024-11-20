import { IsString } from 'class-validator';

export class CreateClassesDto {
  @IsString()
  desc: string;
}
