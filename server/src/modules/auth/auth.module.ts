import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '@/types/app/config';
import { CommonService } from '../common/common.service';
import { AppRedisService } from '@/app/depend/redis/redis.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: (configService: ConfigService<IAppConfig>) => {
                const { secret, expiresIn } = configService.get<IAppConfig['jwt']>('jwt');
                return {
                    secret,
                    signOptions: {
                        expiresIn,
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, CommonService, AppRedisService],
})
export class AuthModule { }
