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
        await this.banByIncorrectTimes(ip);
        const signedPassword = this.commonService.signPassword(data.password);
        const foundData = await this.prismaService.user.findFirst({
            where: {
                account: data.account,
                password: signedPassword,
            },
        });

        if (!foundData) {
            const times = await this.setIncorrectTimes(ip);
            await this.banByIncorrectTimes(ip, times);
            throw new BadRequestException('账号或密码错误');
        }
        const token = await this.generateToken(foundData.id, foundData.roleId);
        await this.removeIncorrectTimes(ip);
        return new LoginResponseDto({
            ...foundData,
            token,
        });
    }

    /** 登录错误次数过多，返回稍后重试异常 */
    private async banByIncorrectTimes(ip: string, times?: number) {
        const redisKey = mergeRedisKey(REDIS_LOGIN_INCORRECT_TIMES, ip);
        if (!times) {
            times = await this.redisService.getJson<number>(redisKey) || 0;
        }
        
        const incorrectRetryTimes = this.configService.get<number>('incorrectRetryTimes');
        if (times + 1 > incorrectRetryTimes) {
            const incorrectRetryExpire = this.configService.get<number>('incorrectRetryExpire');
            await this.redisService.client.set(redisKey, times, 'EX', incorrectRetryExpire);
            throw new BadRequestException(`登录错误次数过多, 请${Math.floor(incorrectRetryExpire/60)}分钟后稍后重试`);
        }
    }

    /** 设置登录错误次数 */
    private async setIncorrectTimes(ip: string) {
        const redisKey = mergeRedisKey(REDIS_LOGIN_INCORRECT_TIMES, ip);
        let times = await this.redisService.getJson<number>(redisKey) || 0;
        times += 1;
        await this.redisService.client.set(redisKey, times);
        return times;
    }

    /** 清除登录错误次数 */
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
