import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app/app.controller';

//AppModule은 main이 합치는 모듈 (메인용), 나머지는 imports에 정리하는 것이 좋음.
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
