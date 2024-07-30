import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  getUserInfo() {
    const adminInfo = {
      userId: '1',
      username: 'admin',
      realName: 'Admin',
      desc: 'manager',
      permissions: [
        {
          label: '主控台',
          value: 'dashboard_console',
        },
        {
          label: '监控页',
          value: 'dashboard_monitor',
        },
        {
          label: '工作台',
          value: 'dashboard_workplace',
        },
        {
          label: '基础列表',
          value: 'basic_list',
        },
        {
          label: '基础列表删除',
          value: 'basic_list_delete',
        },
      ],
    };
    return adminInfo;
  }

  async getUserPageData() {
    const res = await this.prismaService.getPageData(
      this.prismaService.user,
      {},
      {
        where: {},
      },
    );
    return res;
  }
}
