import { Injectable } from '@nestjs/common';
import { CreatePermissionRequestDto } from './dto/create-permission.dto';
import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { UpdatePermissionRequestDto } from './dto/update-permission.dto';
import { InjectRedis } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class PermissionService {
    constructor(private readonly prismaService: PrismaService) {}

    async update(id: number, data: UpdatePermissionRequestDto) {
        const savedData = await this.prismaService.permission.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                parentId: data.parentId,
                value: data.value,
                type: data.type,
            },
        });

        return savedData;
    }

    async getList() {
        const data = await this.prismaService.permission.findMany();
        return data;
    }

    async findRolePermission() {}
}
