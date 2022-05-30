import { getAllGenres } from "./genres.dao";

const testGenres = ["test", "test"];

jest.mock("$/db.json", () => ({
  genres: ["test", "test"],
}));

describe("GenresDao", () => {
  describe("getAllGenres method", () => {
    it("should get genres from db", () => {
      const genres = getAllGenres();

      expect(genres).toEqual(testGenres);
    });
  });
});
