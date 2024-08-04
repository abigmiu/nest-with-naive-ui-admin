import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppLoggerService } from '@/app/depend/logger/logger.service';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY, PUBLIC_KEY } from '@/constant/decorator';
import { InjectRedis } from '@songkeys/nestjs-redis';
import { Redis } from 'ioredis';
import { REDIS_ROLE_PERMISSION } from '@/constant/redis';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private reflector: Reflector,
    private appLoggerService: AppLoggerService,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const permissionId = this.reflector.getAllAndOverride<string>(
      PERMISSION_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );
    if (!permissionId) {
      return true;
    }
    const request = ctx.switchToHttp().getRequest();
    const user = request['user'];
    console.log('🚀 ~ PermissionGuard ~ canActivate ~ user:', user);
    if (!user) {
      return false;
    }

    const { roleId } = user;
    const rolePermissionIds = await this.redis.hget(
      REDIS_ROLE_PERMISSION,
      roleId.toString(),
    );

    return rolePermissionIds.includes(permissionId);
  }
}
