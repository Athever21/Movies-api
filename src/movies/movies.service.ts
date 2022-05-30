import { Request, Response } from "express";
import processBody from "@/utils/processBody";
import { MovieModel } from "./movies.model";
import { getMovieByGenres, getRandomMovie, saveMovie } from "./movies.dao";

export const addMovie = async (req: Request, res: Response) => {
  const movie: MovieModel = await processBody(MovieModel, req.body);

  const savedMovie = await saveMovie(movie);

  return res.json(savedMovie);
};

export const getMovie = async (req: Request, res: Response) => {
  let { genres, duration } = req.query;

  const runtime = parseInt(duration as string);

  if (!genres) {
    const movie = await getRandomMovie(runtime);
    return res.json(movie);
  }

  if (typeof genres === 'string') {
    genres = [genres];
  }

  const movies = await getMovieByGenres(genres as string[], runtime);
  return res.json(movies);
};
