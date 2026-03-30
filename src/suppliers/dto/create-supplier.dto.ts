import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateSupplierDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  tradeName?: string;

  @IsOptional()
  @IsString()
  supplierType?: string;

  @IsOptional()
  @IsString()
  contactName?: string;

  @IsOptional()
  @IsString()
  quotationContact?: string;

  @IsOptional()
  @IsString()
  personType?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{14}$/, {
    message: 'CNPJ deve conter exatamente 14 digitos numericos',
  })
  cnpj?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{11}$/, {
    message: 'CPF deve conter exatamente 11 digitos numericos',
  })
  cpf?: string;

  @IsOptional()
  @IsString()
  stateRegistration?: string;

  @IsOptional()
  @IsString()
  ieIndicator?: string;

  @IsOptional()
  @IsString()
  rg?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  streetType?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  stateName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  phone2?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsString()
  paymentCondition?: string;

  @IsOptional()
  @IsString()
  paymentDescription?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage?: number;

  @IsOptional()
  @IsString()
  site?: string;

  @IsOptional()
  @IsString()
  observations?: string;
}
