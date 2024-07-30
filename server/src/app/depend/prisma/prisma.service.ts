import { IPagerParams } from '@/types/pager';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

type IPrismaDelegate = Prisma.UserDelegate | Prisma.GoodDelegate;

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  async getPageData<
    T extends IPrismaDelegate,
    M extends Parameters<T['findMany']>[0],
  >(model: T, pageQuery: IPagerParams, queryOptions: M) {
    const { page = 1, pageSize = 20 } = pageQuery;

    const [total, data] = await this.$transaction([
      // @ts-ignore
      model.count({ where: queryOptions.where }),
      // @ts-ignore
      model.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
      }),
    ]);

    const totalPage = Math.ceil(total / pageSize);

    return {
      page,
      pageSize,
      pageCount: totalPage,
      itemCount: total,
      list: data,
    };
  }
}
