import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Como usar React Hooks efetivamente' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Neste post vamos explorar os principais hooks do React...' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiPropertyOptional({ example: 'https://example.com/thumbnail.png' })
  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string;

  @ApiPropertyOptional({ example: ['React', 'TypeScript'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
