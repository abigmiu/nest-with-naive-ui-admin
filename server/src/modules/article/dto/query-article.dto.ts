import { IPagerParams } from "@/types/pager";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class QueryArticleRequestDto extends IPagerParams  {
    @IsString()
    @IsOptional()
    title?: string;


}