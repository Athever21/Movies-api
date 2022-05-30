import { getAllGenres } from "./genres.service";

let daoMock: any;
jest.mock("./genres.dao", () => {
  daoMock = {
    getAllGenres: jest.fn(),
  };
  return daoMock;
});

describe("GenresService", () => {
  describe("getAllGenres method", () => {
    const genresMock = ["a", "b"];

    it("should call dao", () => {
      daoMock.getAllGenres.mockImplementationOnce(() => genresMock);

      const genres = getAllGenres();

      expect(genres).toEqual(genresMock);
      expect(daoMock.getAllGenres).toHaveBeenCalledTimes(1);
    });
  });
});
