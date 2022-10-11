import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

//PartialType copys the same DTO, but everything not required.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
