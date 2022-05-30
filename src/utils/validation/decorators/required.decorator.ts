import { registerDecorator } from "class-validator";
import { RequireValidator } from "../validators/requried.validator";

export function Requried() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "required",
      target: object.constructor,
      propertyName: propertyName,
      validator: RequireValidator,
    });
  };
}
