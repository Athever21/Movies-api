import supertest from "supertest";
import { server } from "../src/index";
import movieFactory  from '../src/utils/factories/movie.factory';

describe("Movies (e2e)", () => {
  const api = supertest(server);

  afterAll((done) => {
    server.close(done);
  });

  describe("/api/movie GET", () => {
    it("should get random movie", async () => {
      const res = await api.get("/api/movie");

      expect(res.body).toHaveProperty("id");
    });

    it("should get random movie with duration", async () => {
      const res = await api.get("/api/movie").query({ duration: 60 });

      expect(res.body).toHaveProperty("id");
      const val = parseInt(res.body.runtime);
      expect(val).toBeGreaterThanOrEqual(50);
      expect(val).toBeLessThan(70);
    });

    it("should get random movie with genres", async () => {
      const res = await api
        .get("/api/movie")
        .query({ genres: ["Comedy", "Drama"] });

      expect(Array.isArray(res.body)).toBe(true);
      for (const m of res.body) {
        expect(
          m.genres.includes("Comedy") || m.genres.includes("Drama")
        ).toBeTruthy();
      }
    });

    it("should get random movie with genres and duration", async () => {
      const res = await api
        .get("/api/movie")
        .query({ genres: ["Comedy", "Drama"], duration: 60 });

      expect(Array.isArray(res.body)).toBe(true);
      for (const m of res.body) {
        expect(
          m.genres.includes("Comedy") || m.genres.includes("Drama")
        ).toBeTruthy();
        const val = parseInt(m.runtime);
        expect(val).toBeGreaterThanOrEqual(50);
        expect(val).toBeLessThan(70);
      }
    });
  });

  describe('/api/movie POST', () => {
    const movie = movieFactory({ genres: ['Comedy', 'Drama']});
    
    it('should add movie', async() => {
      const res = await api.post('/api/movie').send(movie);

      expect(res.body.title).toEqual(movie.title);

      const {movies} = require('../data/db.json');
      expect(movies[movies.length - 1].id).toEqual(res.body.id);
    })

    it('should throw error if genre incorrect', async() => {
      const movie = movieFactory({ genres: ['a', 'b']});
      const res = await api.post('/api/movie').send(movie);

      expect(res.body.errors[0]).toEqual('Genres a,b is invalid!');
    })
  })
});
