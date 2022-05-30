import { getAllGenres } from "@/genres/genres.service";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isGenreCorrect", async: false })
export class GenreValidator implements ValidatorConstraintInterface {
  invalidGenres: string[];

  validate(genres: string[]) {
    if (!Array.isArray(genres)) {
      return true;
    }

    const allGenres = getAllGenres();
    const invalids: string[] = [];

    for (const genre of genres) {
      if (!allGenres.includes(genre)) {
        invalids.push(genre);
      }
    }

    if (invalids.length) {
      this.invalidGenres = invalids;
      return false;
    }

    return true;
  }

  defaultMessage() {
    return `Genre${this.invalidGenres.length === 1 ? "" : "s"} ${
      this.invalidGenres
    } is invalid!`;
  }
}
