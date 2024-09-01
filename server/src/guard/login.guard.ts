import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppLoggerService } from '@/app/depend/logger/logger.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '@/constant/decorator';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private appLoggerService: AppLoggerService,
    ) { }

    async canActivate(ctx: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
            ctx.getHandler(),
            ctx.getClass(),
        ]);
        const request = ctx.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if (token) {
            try {
                const payload = await this.jwtService.verifyAsync(token);
                request['user'] = payload;
                return true;
            } catch (e) {
                this.appLoggerService.error('token 校验失败', e, token);
            }
        }

        return !!isPublic;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        // @ts-expect-error authorization maybe in headers
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
