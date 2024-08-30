import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
    CreateUserRequestDto,
    CreateUserResponseDto,
} from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

@Injectable()
export class UserService {
    constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    ) { }

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
                select: {
                    role: {
                        select: {
                            name: true,
                        },
                    },
                    password: false,
                    id: true,
                    username: true,
                    account: true,
                    updatedAt: true,
                    createdAt: true,
                },
                where: {},
                orderBy: {
                    id: 'desc',
                },
            },
        );
        return res;
    }

    async createUser(dto: CreateUserRequestDto) {
        if (!dto.password) {
            dto.password = '123456';
        }

        const foundRole = await this.prismaService.role.findFirst({
            where: { id: dto.roleId },
        });
        if (!foundRole) {
            throw new BadRequestException('角色不存在');
        }

        const foundAccount = await this.prismaService.user.findFirst({
            where: { account: dto.account },
        });
        if (foundAccount) {
            throw new BadRequestException('账号已存在');
        }

        const signedPassword = createHmac(
            'sha1',
            this.configService.get<string>('hamcKey'),
        )
            .update(dto.password)
            .digest('hex');

        const savedData = await this.prismaService.user.create({
            data: {
                username: dto.username,
                account: dto.account,
                password: signedPassword,
                roleId: dto.roleId,
            },
            include: {
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return new CreateUserResponseDto(savedData);
    }
}
