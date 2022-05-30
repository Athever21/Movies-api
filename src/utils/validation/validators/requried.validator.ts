import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "required", async: false })
export class RequireValidator implements ValidatorConstraintInterface {
  validate(text: string) {

    return !!text;
  }

  defaultMessage(args: ValidationArguments) {
    return `Field ${args.property} is required!`;
  }
}
