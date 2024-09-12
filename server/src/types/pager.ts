import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsOptional } from "class-validator";

export class IPagerParams {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageSize: number = 20;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  firstId?: number;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  realtime?: boolean;
}
