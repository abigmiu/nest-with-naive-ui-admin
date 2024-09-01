import { IsString } from "class-validator";

export class CreateArticleRequestDto {
    @IsString()
    title: string;

    @IsString()
    content: string;
}