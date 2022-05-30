import { registerDecorator } from "class-validator";
import { GenreValidator } from "../validators/genre.validator";

export function IsGenreCorrect() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isGenreCorrect",
      target: object.constructor,
      propertyName: propertyName,
      validator: GenreValidator,
    });
  };
}
