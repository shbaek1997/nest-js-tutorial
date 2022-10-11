import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movieFound = this.movies.find((movie) => movie.id === id);
    if (!movieFound){
      throw new NotFoundException(`Movie with ID: ${id} not found`)
    }
    return movieFound;
  }

  deleteOne(id: string) {
    this.getOne(id)
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }


  create(movieData) {
    this.movies.push({
      id: String(this.movies.length + 1),
      ...movieData,
    });
  }

  update(id: string, updateData) {
    const movieFound = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movieFound, ...updateData });
  }
}
