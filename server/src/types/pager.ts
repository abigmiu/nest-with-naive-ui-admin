import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class IPagerParams {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page?: number;
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageSize?: number;
}
