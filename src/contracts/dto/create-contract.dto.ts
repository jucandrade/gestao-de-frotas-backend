import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContractItemDto {
  @IsOptional()
  @IsString()
  ctoAcronym?: string;

  @IsOptional()
  @IsString()
  ctoName?: string;

  @IsOptional()
  @IsNumber()
  productPercentage?: number;

  @IsOptional()
  @IsNumber()
  servicePercentage?: number;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsNumber()
  reserved?: number;

  @IsOptional()
  @IsNumber()
  productReserve?: number;

  @IsOptional()
  @IsNumber()
  usedProduct?: number;

  @IsOptional()
  @IsNumber()
  productBalance?: number;

  @IsOptional()
  @IsNumber()
  serviceReserve?: number;

  @IsOptional()
  @IsNumber()
  usedService?: number;

  @IsOptional()
  @IsNumber()
  serviceBalance?: number;

  @IsOptional()
  @IsNumber()
  balance?: number;

  @IsOptional()
  @IsString()
  ctoCategory?: string;
}

export class CreateContractDto {
  @IsOptional()
  @IsInt()
  contractNumber?: number;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  contractType?: string;

  @IsOptional()
  @IsInt()
  contractYear?: number;

  @IsOptional()
  @IsString()
  extraCodeDRAC?: string;

  @IsOptional()
  @IsString()
  deliveryLocation?: string;

  @IsOptional()
  @IsNumber()
  totalValue?: number;

  @IsOptional()
  @IsNumber()
  generalBalance?: number;

  @IsOptional()
  @IsNumber()
  productPercentage?: number;

  @IsOptional()
  @IsNumber()
  productValue?: number;

  @IsOptional()
  @IsNumber()
  servicePercentage?: number;

  @IsOptional()
  @IsNumber()
  serviceValue?: number;

  @IsOptional()
  @IsNumber()
  reserved?: number;

  @IsOptional()
  @IsNumber()
  reserveBalance?: number;

  @IsOptional()
  @IsNumber()
  reservedProduct?: number;

  @IsOptional()
  @IsNumber()
  usedProduct?: number;

  @IsOptional()
  @IsNumber()
  reservedService?: number;

  @IsOptional()
  @IsNumber()
  usedService?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContractItemDto)
  items?: CreateContractItemDto[];
}
