import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({ description: 'Name of the topic' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the topic (optional)' })
  @IsOptional()
  @IsString()
  description?: string;
}