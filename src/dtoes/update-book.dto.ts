import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsOptional()
  publishedDate?: Date;

  @IsString()
  @IsOptional()
  isbn?: string;

  @IsArray()
  @IsOptional()
  topics?: string[]; // Array of Topic IDs
}
