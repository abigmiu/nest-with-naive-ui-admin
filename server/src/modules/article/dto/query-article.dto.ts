import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class QueryArticleRequestDto  {
    @IsString()
    @IsOptional()
    title?: string;

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    page = 1;

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    pageSize = 20;
}