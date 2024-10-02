import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserVideoRequestDto } from './dto/CreateUserVideo';
import { Prisma } from '@prisma/client';
import { QueryUserVideoRequestDto } from './dto/QueryUserVideo';
import { omit } from 'es-toolkit';
import { PageResponse } from '@/types/pager';

@Injectable()
export class UserVideoService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    /** 用户创建视频 */
    async createVideo(dto: CreateUserVideoRequestDto, userId: number) {
        // @ts-ignore
        const userVideoCreateData: Prisma.UserVideoCreateArgs['data'] = {
            title: dto.title,
            coverUrl: '',
            videoUrl: dto.videoUrl,
            desc: dto.desc,
            location: '',
            authorId: userId,
            // author
            // author: {  }

        };
        const savedRes = await this.prismaService.userVideo.create({
            data: userVideoCreateData
        });
        return savedRes;
    }

    async queryVideoPage(query: QueryUserVideoRequestDto, userId: number) {
        const { page, pageSize } = query;
        const queryArgs: Prisma.UserVideoFindManyArgs = {
            take: pageSize,
            skip: pageSize * (page - 1),
            where: {
                authorId: userId
            }
        };

        const [total, data] = await this.prismaService.$transaction([
            this.prismaService.userVideo
                .count({
                    where: queryArgs.where,
                }),
            this.prismaService.userVideo.findMany(queryArgs)
        ]);

        return new PageResponse({
            total,
            data,
            page,
            pageSize
        });
    }
}
