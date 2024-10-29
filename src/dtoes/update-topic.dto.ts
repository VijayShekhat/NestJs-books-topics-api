import { IsString, IsOptional } from 'class-validator';

export class UpdateTopicDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
