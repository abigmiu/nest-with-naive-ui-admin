import { IsInt, IsOptional, IsString } from 'class-validator';

export class QueryListRequestDto {
  @IsInt()
  @IsOptional()
  page = 1;

  @IsInt()
  @IsOptional()
  pageSize = 20;

  @IsString()
  @IsOptional()
  name?: string;
}
