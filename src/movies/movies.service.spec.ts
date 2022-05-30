import { addMovie, getMovie } from "./movies.service";
import movieFactory from "@/utils/factories/movie.factory";
import { MovieModel } from "./movies.model";

let processBodyMock: any;
let daoMock: any;

jest.mock("@/utils/processBody", () => {
  processBodyMock = jest.fn();
  return processBodyMock;
});

jest.mock("./movies.dao", () => {
  daoMock = {
    getMovieByGenres: jest.fn(),
    getRandomMovie: jest.fn(),
    saveMovie: jest.fn(),
  };
  return daoMock;
});

describe("MoviesService", () => {
  describe("addMovie method", () => {
    const reqMock = { body: movieFactory() } as any;
    const resMock = { json: jest.fn() } as any;

    it("should add movie", async () => {
      processBodyMock.mockImplementationOnce(() => reqMock.body);
      daoMock.saveMovie.mockImplementationOnce(() => reqMock.body);

      await addMovie(reqMock, resMock);

      expect(processBodyMock).toHaveBeenCalledTimes(1);
      expect(processBodyMock).toHaveBeenCalledWith(MovieModel, reqMock.body);
      expect(daoMock.saveMovie).toHaveBeenCalledTimes(1);
      expect(daoMock.saveMovie).toHaveBeenCalledWith(reqMock.body);
      expect(resMock.json).toHaveBeenCalledTimes(1);
      expect(resMock.json).toHaveBeenCalledWith(reqMock.body);
    });
  });

  describe("getMovie method", () => {
    it("should get random movie", async () => {
      const reqMock = { query: { duration: 10} } as any;
      const resMock = { json: jest.fn() } as any;

      const movie = movieFactory();

      daoMock.getRandomMovie.mockImplementationOnce(() => movie);

      await getMovie(reqMock, resMock);

      expect(daoMock.getRandomMovie).toHaveBeenCalledTimes(1);
      expect(daoMock.getRandomMovie).toHaveBeenCalledWith(10);
      expect(resMock.json).toHaveBeenCalledTimes(1);
      expect(resMock.json).toHaveBeenCalledWith(movie);
    });

    it("should get random movie", async () => {
      const reqMock = { query: { duration: 10, genres: ['a']} } as any;
      const resMock = { json: jest.fn() } as any;

      const movie = movieFactory();

      daoMock.getMovieByGenres.mockImplementationOnce(() => [movie]);

      await getMovie(reqMock, resMock);

      expect(daoMock.getMovieByGenres).toHaveBeenCalledTimes(1);
      expect(daoMock.getMovieByGenres).toHaveBeenCalledWith(reqMock.query.genres, 10);
      expect(resMock.json).toHaveBeenCalledTimes(1);
      expect(resMock.json).toHaveBeenCalledWith([movie]);
    });
  });
});
