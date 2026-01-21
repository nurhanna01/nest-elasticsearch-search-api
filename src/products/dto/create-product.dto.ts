import { IsEnum, IsNumber, IsString } from 'class-validator';
import 'reflect-metadata';

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsString()
  description: string;
}
