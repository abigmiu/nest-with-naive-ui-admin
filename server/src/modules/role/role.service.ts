import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRoleRequestDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
    constructor(private readonly prismaService: PrismaService) {
        console.log('roleService');
    }

    async getList() {
        const foundData = await this.prismaService.getPageData(
            this.prismaService.role,
            {
                pageSize: 9999,
            },
            {},
        );
        return foundData;
    }

    /** 获取角色简单列表 */
    async getSimpleList() {
        const foundData = await this.prismaService.role.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return foundData;
    }

    async createRole(data: CreateRoleRequestDto) {
        console.log('🚀 ~ RoleService ~ createRole ~ data:', data);

        const savedData = await this.prismaService.role.create({
            data: {
                name: data.name,
                remark: data.remark,
            },
        });
        console.log('3213');
        await this.prismaService.roleToPermission.createMany({
            data: data.permissionIds.map((id) => ({
                permissionId: id,
                roleId: savedData.id,
            })),
        });
        console.log('saved');
        return 'success';
    }
}
