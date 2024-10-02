import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppLoggerService } from '@/app/depend/logger/logger.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '@/constant/decorator';
import { AppRedisService } from '@/app/depend/redis/redis.service';
import { IRedisLoginInfo } from '@/types/redis';
import { REDIS_LOGIN_INFO } from '@/constant/redis';
import { Request } from 'express';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private redisService: AppRedisService,
        private appLoggerService: AppLoggerService,
    ) { }

    async canActivate(ctx: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
            ctx.getHandler(),
            ctx.getClass(),
        ]);
        const request = ctx.switchToHttp().getRequest<Request>();

        const token = this.extractTokenFromHeader(request);

        let tokenAvailable = false;

        if (token) {
            const url = request.url;


            try {
                if (url.startsWith('/api/app')) {
                    const payload = await this.jwtService.verifyAsync(token);
                    request['user'] = {
                        id: Number(payload.userId),
                    };
                    return true;
                } else {
                    const payload: Record<keyof IRedisLoginInfo, string> = await this.redisService.client.hgetall(`${REDIS_LOGIN_INFO}:${token}`);
                   
                    request['user'] = {
                        id: Number(payload.userId),
                        // @ts-ignore
                        roleId: Number(payload.roleId),
                    };
                    request['token'] = token;
                    tokenAvailable = true;
                    return true;
                }

            } catch (e) {
                this.appLoggerService.error('token 校验失败', e, token);
                return false;
            }
        }

        if (!isPublic && !tokenAvailable) {
            throw new UnauthorizedException("登录过期");
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        // @ts-ignore
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
