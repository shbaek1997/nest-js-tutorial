import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  //beforeEach 말고도 afterAll, beforeAll 등 다른 것도 초기화 등에 활용할때 유용하다.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //try first unit test
  describe('GetAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('GetOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'test1',
        year: 2012,
        genres: ['Test'],
      });
      const movie = service.getOne(1);
      const { id } = movie;
      expect(movie).toBeDefined();
      expect(id).toEqual(1);
    });
    it('should throw error not found', () => {
      try {
        service.getOne(256);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        const { message } = error;
        expect(message).toEqual(`Movie with ID: 256 not found`);
      }
    });
  });
  describe('DeleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'test1',
        year: 2012,
        genres: ['Test'],
      });
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toEqual(beforeDelete.length - 1);
    });
    it('should throw 404', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreateLength = service.getAll().length;
      service.create({
        title: 'test1',
        year: 2012,
        genres: ['Test'],
      });
      const afterCreateLength = service.getAll().length;
      expect(afterCreateLength).toEqual(beforeCreateLength + 1);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test1',
        year: 2012,
        genres: ['Test'],
      });
      const updateData = {
        year: 2000,
      };
      service.update(1, updateData);
      const movie = service.getOne(1);
      const { year } = movie;
      expect(year).toEqual(2000);
    });
    it('should return 404', () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
