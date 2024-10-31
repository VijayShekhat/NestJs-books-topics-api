import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ description: 'The title of the book (optional)' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The author of the book (optional)' })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({ description: 'Published date of the book (optional)' })
  @IsOptional()
  publishedDate?: Date;

  @ApiProperty({ description: 'ISBN of the book (optional)' })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiProperty({ description: 'Array of Ids of the topics included in the book (optional)' })
  @IsArray()
  @IsOptional()
  topics?: string[]; // Array of Topic IDs
}
