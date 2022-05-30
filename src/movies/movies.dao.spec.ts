import { getMovieByGenres, getRandomMovie, saveMovie } from "./movies.dao";
import movieFactory from "@/utils/factories/movie.factory";
import { MovieModel } from "./movies.model";
import { join } from "path";

const cwd = process.cwd();

let moviesMock: MovieModel[];
let genresMock: string[];
let fsMock: any;

jest.mock("$/db.json", () => {
  const factory = require("@/utils/factories/movie.factory").default;

  moviesMock = [
    factory({ runtime: "60" }),
    factory({ genres: ["a", "b"], runtime: "100" }),
    factory({ genres: ["b"], runtime: "80" }),
  ];
  genresMock = ["test1", "test2"];

  return {
    genres: genresMock,
    movies: moviesMock,
  };
});
jest.mock("fs", () => {
  fsMock = {
    promises: {
      writeFile: jest.fn(),
    },
  };
  return fsMock;
});

describe("MoviesDao", () => {
  describe("saveMovie method", () => {
    const movieMock = movieFactory();

    it("should save movie to db", async () => {
      const ret = await saveMovie(movieMock);

      const findIndex = moviesMock.findIndex((x) => x.id === ret.id);
      expect(findIndex).not.toEqual(-1);
      expect(fsMock.promises.writeFile).toBeCalledTimes(1);
      expect(fsMock.promises.writeFile).toBeCalledWith(
        join(cwd, "data", "db.json"),
        JSON.stringify({ genres: genresMock, movies: moviesMock }, null, 4)
      );
    });
  });

  describe("getRandomMovie method", () => {
    it("should return random movie", async () => {
      const ret = await getRandomMovie();

      const findIndex = moviesMock.findIndex((x) => x.id === ret.id);
      expect(findIndex).not.toEqual(-1);
    });

    it("should correctly handle duration", async () => {
      const ret = await getRandomMovie(60);

      const findIndex = moviesMock.findIndex((x) => x.id === ret.id);
      expect(findIndex).not.toEqual(-1);
      const val = parseInt(ret.runtime);
      expect(val).toBeGreaterThanOrEqual(50);
      expect(val).toBeLessThan(70);
    });
  });

  describe("getMovieByGenres method", () => {
    it("should return array of movies", async () => {
      const ret = await getMovieByGenres(['b']);

      expect(ret.length).toBe(2);
      for (const m of ret) {
        expect(m.genres).toContain('b');
      }
    });

    it("should correctly handle duration", async () => {
      const ret = await getMovieByGenres(['b'], 100);

      expect(ret.length).toBe(1);
      expect(ret[0].genres).toContain('b');
      const val = parseInt(ret[0].runtime);
      expect(val).toBeGreaterThanOrEqual(90);
      expect(val).toBeLessThan(110);
    });
  });
});
