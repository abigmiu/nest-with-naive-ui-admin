import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { QueryListRequestDto } from './dto/query-list.dto';

@Injectable()
export class ListService {
    constructor(private readonly prismaService: PrismaService) {}

    async getList(query: QueryListRequestDto) {
        const { page, pageSize } = query;

        const findManyOptions: Parameters<
      (typeof this.prismaService.good)['findMany']
    >[0] = {
        where: {},
    };
        if (query.name) {
            findManyOptions.where.name = query.name;
        }

        return this.prismaService.getPageData(
            this.prismaService.good,
            {
                page,
                pageSize,
            },
            findManyOptions,
        );
    }
}
