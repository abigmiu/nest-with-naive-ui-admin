import { PartialType } from "@nestjs/swagger";
import { CreateArticleRequestDto } from "./create-article.dto";
import { IsIn, IsInt } from "class-validator";

export class UpdateArticleRequestDto extends CreateArticleRequestDto {
    constructor() {
        super();
    }

    @IsInt()
    articleId: number;
}