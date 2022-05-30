import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { HttpError } from "./errors/HttpError";

export default async(Class: ClassConstructor<any>, body: Record<string, any>) => {
  const property = {};
  Object.assign(property, body);
  const clazz = plainToClass(Class, property);
  const errors = await validate(clazz);
  const errorsMessages = errors.map(
    (x) => Object.values(x.constraints as Record<string, string>)[0]
  );
  
  if (errorsMessages.length) {
    throw new HttpError(400, errorsMessages);
  }

  return clazz;
}