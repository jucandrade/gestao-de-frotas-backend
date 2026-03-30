import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSupplierContactDto {
  @IsOptional()
  @IsInt()
  sequence?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  positionCode?: string;

  @IsOptional()
  @IsString()
  positionDescription?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsNotEmpty()
  @IsString()
  supplierId: string;
}
