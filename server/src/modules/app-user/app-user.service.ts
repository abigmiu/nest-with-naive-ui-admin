import { PrismaService } from '@/app/depend/prisma/prisma.service';
import {  BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { AppLoginRequestDto, AppRegisterRequestDto, UpdateUserInfoRequestDto } from './dto/request.dto';
import { APP_USER_NOT_EXIST } from '@/constant/response-code';
import { AppLoginResponseDto, AppRegisterResponseDto, AppUserStatsResponseDto } from './dto/response.dto';
import { Prisma } from '@prisma/client';
import { generateRandomString } from '@/utils';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppUserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    /**
     * 登录
     * @param dto 
     */
    async login(dto: AppLoginRequestDto) {
        const hasAccount = await this.prismaService.appUser.findFirst({
            where: {
                phone: dto.phone
            }
        });
        if (!hasAccount) {
            throw new HttpException('手机号不存在', APP_USER_NOT_EXIST);
        }

        const foundData = await this.prismaService.appUser.findFirst({
            where: {
                password: dto.password,
                phone: dto.phone
            }
        });
        if (!foundData) {
            throw new BadRequestException('密码错误');
        }
        const token = this.genToken(foundData.id);
        const res = new AppLoginResponseDto({...foundData, token});
        
        return res;
    }

    /** 手机密码登录 */
    async phonePasswordRegister(data: Pick<AppRegisterRequestDto, 'phone' | 'password'>) {
        const exitPhone = await this.prismaService.appUser.findFirst({
            where: {
                phone: data.phone
            }
        });
        if (exitPhone) {
            throw new BadRequestException("手机号已注册");
        }

        const createData: Prisma.AppUserCreateArgs = {
            data: {
                phone: data.phone,
                password: data.password,
                avatar: 'https://www.gravatar.com/avatar/d1d93345b0749d6791534b6d1e22ea68cbbb4882fd43f998e020f8053e298d1b',
                nickname: `用户${generateRandomString(6)}`,
                account: v4(),
            }
        };
        const savedData = await this.prismaService.appUser.create(createData);
        const token = this.genToken(savedData.id);
        return new AppRegisterResponseDto({...savedData, token: token});
    }

    /** 生成token */
    private genToken(appUserId: number) {
        return this.jwtService.sign({
            userId: appUserId
        });
    }

    /** 获取点赞、朋友熟等数据 */
    async getUserStats(userId: number) {
        const foundData = await this.prismaService.appUser.findFirst({
            where: {
                id: userId
            },
            select: {
                likeCount: true,
                fansCount: true,
                followCount: true,
                friendCount: true,
            }
        });
        if (!foundData) {
            throw new BadRequestException('用户不存在');
        }

        return new AppUserStatsResponseDto(foundData);
    }

    /** 更新用户信息 */
    async updateUserInfo(userId: number, dto: UpdateUserInfoRequestDto) {
        const updateData: Prisma.AppUserUpdateArgs['data'] = {};
        if (dto.nickname) {
            updateData.nickname = dto.nickname.trim();
        }
        
        await this.prismaService.appUser.update({
            where: {
                id: userId
            },
            data: updateData,
        });
        
    }
}