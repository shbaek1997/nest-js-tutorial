import { Controller, Delete, Get, Post, Param, Patch, Body, Query } from '@nestjs/common';

@Controller('movies') //'movies'가 entry point를 설정함, controller 안의 string이 router route임.
export class MoviesController {
  @Get()
  getAll(): string {
    return 'This returns all movies';
  }

  @Get('/search')
  search(@Query('year') searchYear){
    return `searching for a movie in year: ${searchYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    //parameter 설정 시 @Param과 parameter data type 지정이 필요
    //@Param 안의 id부분은 :/id와 같아야 하지만 id:string은 id이름과 달라도 됨.
    return `This returns movie with id: ${id}`;
  }

  @Post()
  create(@Body() movieData){
    console.log(movieData);
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return `this will delete a movie with id: ${id}`
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateData) {
    return {
      movieId: id,
      ...updateData
    }

  }

}
