import { IsNumberString, IsOptional } from 'class-validator';

export class ProductSearchDto {
  @IsOptional()
  keyword?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  @IsNumberString()
  minPrice?: number;

  @IsOptional()
  @IsNumberString()
  maxPrice?: number;
}
