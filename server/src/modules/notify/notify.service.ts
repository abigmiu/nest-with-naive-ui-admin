import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { QueryNotifyDto } from './dto/query-notify.dto';
import { CreateNotifyRequestDto } from './dto/create-notify.dto';

@Injectable()
export class NotifyService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    /**  获取已发布通知   */
    async getPublishedList() {
        const list = await this.prismaService.notify.findMany({
            where: {
                published: true,
            }
        });

        return list;
    }

    /** 分页获取数据 */
    async getPageData(query: QueryNotifyDto) {
        const res = await this.prismaService.getPageData(
            this.prismaService.notify,
            query,
            {
                orderBy: {
                    id: 'desc'
                }
            }
        );
        return res;
    }

    /** 创建通知 */
    async createNotify(data: CreateNotifyRequestDto) {
        const savedData = await this.prismaService.notify.create({
            data: {
                title: data.title || '',
                content: data.content,
            }
        });

        return savedData;
    }

}
