import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRoleRequestDto } from './dto/create-role.dto';
import { QueryRoleInfoResponseDto, QueryRoleListResponseDto } from './dto/query-role.dto';
import { EditRoleRequestDto } from './dto/edit-role.dto';

@Injectable()
export class RoleService {
    constructor(private readonly prismaService: PrismaService) {
        console.log('roleService');
    }

    async getList() {
        const foundData = await this.prismaService.role.findMany({
            include: {
                permissions: {
                    include: {
                        permission: true,
                    }
                },
            },
            orderBy: {
                id: 'desc',
            },
        });
        return foundData.map((item) => new QueryRoleListResponseDto(item));
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
        const savedData = await this.prismaService.role.create({
            data: {
                name: data.name,
                remark: data.remark,
            },
        });
        await this.prismaService.roleToPermission.createMany({
            data: data.permissionIds.map((id) => ({
                permissionId: id,
                roleId: savedData.id,
            })),
        });
        return 'success';
    }

    /** 更新角色 */
    async updateRole(updateData: EditRoleRequestDto) {
        const originRelation = await this.prismaService.roleToPermission.findMany({
            where: {
                roleId: updateData.roleId,
            }
        });

        await this.prismaService.role.update({
            where: {
                id: updateData.roleId,
            },
            data: {
                name: updateData.name,
                remark: updateData.remark,
            },
        });

        for (let i = 0; i < originRelation.length; i++) {
            await this.prismaService.roleToPermission.deleteMany({
                where: {
                    roleId: updateData.roleId,
                    permissionId: originRelation[i].permissionId
                }
            });
        }   

        await this.prismaService.roleToPermission.createMany({
            data: updateData.permissionIds.map((item) => ({
                permissionId: item,
                roleId: updateData.roleId
            }))
        });
        
    }

    /** 获取角色信息 */
    async getRoleInfo(roleId: number) {
        const foundData = await this.prismaService.role.findFirst({
            where: {
                id: roleId
            },
            include: {
                permissions: {
                    select: {
                        permission: true,
                        permissionId: true
                    }
                }
            }
        });

        return new QueryRoleInfoResponseDto(foundData);
    }
}
