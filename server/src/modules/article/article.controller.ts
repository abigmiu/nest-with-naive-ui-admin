import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleRequestDto } from './dto/create-article.dto';
import { UpdateArticleRequestDto } from './dto/update-article.dto';
import { QueryArticleRequestDto } from './dto/query-article.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get('page')
    getPageData(@Body() query: QueryArticleRequestDto) {
        return this.articleService.getPageData(query);
    }

    @Post('create')
    create(@Body() body: CreateArticleRequestDto) {
        return this.articleService.createArticle(body);
    }

    @Post('update')
    update(@Body() body: UpdateArticleRequestDto) {
        return this.articleService.updateArticle(body);
    }
}
