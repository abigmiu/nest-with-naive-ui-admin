import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateArticleRequestDto } from './dto/create-article.dto';
import { UpdateArticleRequestDto } from './dto/update-article.dto';
import { QueryArticleRequestDto } from './dto/query-article.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async createArticle(dto: CreateArticleRequestDto) {
        const savedData = await this.prismaService.article.create({
            data: {
                title: dto.title,
                content: dto.content,
            }
        });

        return savedData;
    }

    async updateArticle(dto: UpdateArticleRequestDto) {
        const savedData = await this.prismaService.article.update({
            where: {
                id: dto.articleId
            },
            data: {
                title: dto.title,
                content: dto.content
            }
        });
        return savedData;
    }

    async getPageData(query: QueryArticleRequestDto) {
        const { page, pageSize } = query;

        const findManyOptions: Prisma.Args<typeof this.prismaService.article, 'findMany'> = {
            where: {}
        };
        if (query.title) {
            findManyOptions.where.title = query.title;
        }

        const foundData = await this.prismaService.getPageData(
            this.prismaService.article,
            {
                page,
                pageSize
            },
            findManyOptions
        );
        return foundData;
    }

}
