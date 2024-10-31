import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateTopicDto {
  @ApiProperty({ description: 'Name of the topic (optional)' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Description of the topic (optional)' })
  @IsOptional()
  @IsString()
  description?: string;
}
