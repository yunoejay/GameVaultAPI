import { IsInt, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  genre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  platform?: string;

  @IsOptional()
  @IsInt()
  @Min(1970)
  year?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  image?: string; // Allow any string; frontend may pass non-URL during local testing

  @IsOptional()
  @IsString()
  @MaxLength(500)
  gameUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  developer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  publisher?: string;
}
