import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  publishedDate: Date;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsArray()
  @IsOptional()
  topics?: string[]; // Array of Topic IDs
}