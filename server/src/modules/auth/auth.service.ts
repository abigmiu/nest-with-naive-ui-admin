import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { CommonService } from '../common/common.service';
import { AppRedisService } from '@/app/depend/redis/redis.service';
import { mergeRedisKey } from '@/utils';
import { REDIS_LOGIN_INCORRECT_TIMES } from '@/constant/redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
        private readonly commonService: CommonService,
        private readonly redisService: AppRedisService,
        private readonly configService: ConfigService
    ) { }

    /** 登录 */
    async login(data: LoginRequestDto, ip: string) {
        const signedPassword = this.commonService.signPassword(data.password);
        const foundData = await this.prismaService.user.findFirst({
            where: {
                account: data.account,
                password: signedPassword,
            },
        });

        if (!foundData) {
            await this.setIncorrectTimes(ip);
            throw new BadRequestException('账号或密码错误');
        }
        const token = await this.generateToken(foundData.id, foundData.roleId);
        await this.removeIncorrectTimes(ip);
        return new LoginResponseDto({
            ...foundData,
            token,
        });
    }

    private async setIncorrectTimes(ip: string) {
        const redisKey = mergeRedisKey(REDIS_LOGIN_INCORRECT_TIMES, ip);
        const times = await this.redisService.getJson<number>(redisKey) || 0;
        
        const incorrectRetryTimes = this.configService.get<number>('incorrectRetryTimes');
        if (times + 1 > incorrectRetryTimes) {
            const incorrectRetryExpire = this.configService.get<number>('incorrectRetryExpire');
            await this.redisService.client.set(redisKey, times, 'EX', incorrectRetryExpire);
            throw new BadRequestException(`登录错误次数过多, 请${Math.floor(incorrectRetryExpire/60)}分钟后稍后重试`);
        } else {
            await this.redisService.client.set(redisKey, times + 1);
        }
        
    }

    private async removeIncorrectTimes(ip: string) {
        const redisKey = mergeRedisKey(REDIS_LOGIN_INCORRECT_TIMES, ip);
        await this.redisService.client.del(redisKey);
    }

    /** 生成token */
    private async generateToken(id: number, roleId: number) {
        const token = await this.jwtService.signAsync({
            id,
            roleId,
        });
        return token;
    }
}
