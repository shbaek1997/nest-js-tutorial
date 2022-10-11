import { IsString, IsNumber } from 'class-validator';

//using dto and using decorator with class-validator to use validationPipe to check data-type
export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true })
  readonly genres: string[];
}
