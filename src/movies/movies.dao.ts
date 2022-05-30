import { promises as fs } from "fs";
import { join } from "path";
import db from "$/db.json";
import { MovieModel } from "./movies.model";

const movies = db.movies as MovieModel[];
const genres = db.genres;
const cwd = process.cwd();

export const saveMovie = async (movie: MovieModel) => {
  movie.id = movies.length + 1;

  let objectOrder = {
    id: null,
    title: null,
    year: null,
    runtime: null,
    genres: null,
    director: null,
    actors: null,
    plot: null,
    posterUrl: null,
  };

  movie = Object.assign(objectOrder, movie);

  movies.push(movie);

  await fs.writeFile(
    join(cwd, "data", "db.json"),
    JSON.stringify({ genres, movies }, null, 4)
  );
  return movie;
};

export const getRandomMovie = async (duration?: number) => {
  let copy = [...movies];

  if (duration) {
    copy = copy.filter((x) => {
      const r = parseInt(x.runtime);
      return r > duration - 10 && r < duration + 10;
    });
  }

  const index = Math.floor(Math.random() * copy.length);

  return copy[index] ?? null;
};

export const getMovieByGenres = async (genres: string[], duration?: number) => {
  let matchedMovies = [];

  for (const movie of movies) {
    if (duration) {
      const r = parseInt(movie.runtime);
      if (!(r > duration - 10 && r < duration + 10)) {
        continue;
      }
    }

    let matched = 0;

    for (const genre of genres) {
      if (movie.genres.includes(genre)) {
        matched++;
      }
    }

    if (matched) {
      matchedMovies.push([matched, movie]);
    }
  }

  // @ts-expect-error not enough advanced type recognition
  matchedMovies.sort((a,b) => b[0] - a[0]);

  return matchedMovies.map((x) => x[1]) as MovieModel[];
};
