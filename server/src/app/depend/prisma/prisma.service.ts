import { IPagerParams } from '@/types/pager';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
type ModelDelegates = {
  [K in Prisma.ModelName]: PrismaClient[Uncapitalize<K>];
}[Prisma.ModelName];

// type IPrismaDelegate =
//   | Prisma.UserDelegate
//   | Prisma.GoodDelegate
//   | Prisma.RoleDelegate;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super();
    }

    async onModuleInit() {
        console.log(process.env.DATABASE_URL);
        await this.$connect();
    }

    async getPageData<T extends ModelDelegates>(
        model: T,
        pageQuery: IPagerParams,
        queryOptions: Prisma.Args<T, 'findMany'>,
    ) {
        const { page , pageSize } = pageQuery;
      
        const [total, data] = await this.$transaction([
            (model as any).count({ where: queryOptions.where }),
            (model as any).findMany({
                take: pageSize,
                skip: pageSize * (page - 1),
                ...queryOptions,
            }),
        ]);

        const totalPage = Math.ceil(total / pageSize);

        return {
            page,
            pageSize,
            pageCount: totalPage,
            itemCount: total,
            list: data  as any[],
        };
    }
}
