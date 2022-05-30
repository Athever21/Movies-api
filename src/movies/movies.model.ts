import { IsGenreCorrect } from "@/utils/validation/decorators/genre.decorator";
import { Requried } from "@/utils/validation/decorators/required.decorator";
import { IsArray, IsNumberString, IsOptional, IsString, MaxLength } from "class-validator";

export class MovieModel {
  id: number;

  @IsGenreCorrect()
  @IsArray()
  @Requried()
  genres: string[];

  @MaxLength(255)
  @Requried()
  title: string;

  @IsNumberString()
  @Requried()
  year: string;

  @IsNumberString()
  @Requried()
  runtime: string;

  @MaxLength(255)
  @Requried()
  director: string;

  @IsString()
  @IsOptional()
  actors?: string;

  @IsString()
  @IsOptional()
  plot?: string;

  @IsString()
  @IsOptional()
  posterUrl?: string;
}
