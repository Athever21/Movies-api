import { MovieModel } from "@/movies/movies.model";
import casual from 'casual';

export default (inputModel?: Partial<MovieModel>): MovieModel => {
  const movie = {
    id: inputModel?.id ?? casual.integer(),
    title: inputModel?.title ?? casual.title,
    year: inputModel?.year ?? casual.year.toString(),
    runtime: inputModel?.runtime ?? casual.integer().toString(),
    genres: inputModel?.genres ?? casual.array_of_words(),
    director: inputModel?.director ?? casual.name,
    actors: inputModel?.actors,
    plot: inputModel?.plot,
    posterUrl: inputModel?.posterUrl,
  }

  return movie;
}