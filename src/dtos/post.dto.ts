import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
