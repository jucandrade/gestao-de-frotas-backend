import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpsertIntegrationDto {
  @IsString()
  key: string;

  @IsString()
  @IsOptional()
  value?: string;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;
}
