import db from "$/db.json";

const genres = db.genres;

export const getAllGenres = () => {
  return genres;
};