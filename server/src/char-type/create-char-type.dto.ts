import { IsString } from 'class-validator';

export class CreateCharTypeDto {
  @IsString()
  desc: string;
}
