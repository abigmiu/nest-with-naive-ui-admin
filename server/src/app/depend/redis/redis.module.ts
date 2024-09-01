import { IAppConfig } from '@/types/app/config';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@songkeys/nestjs-redis';
import { AppRedisService } from './redis.service';

@Module({
    imports: [
        RedisModule.forRootAsync(
            {
                inject: [ConfigService],
                useFactory(configService: ConfigService) {
                    const redisConfig = configService.get<IAppConfig['redis']>('redis');
                    return {
                        config: {
                            host: redisConfig.host,
                            port: redisConfig.port,
                        },
                    };
                },
            },
            true,
        ),
    ],
    providers: [AppRedisService],
    exports: [AppRedisService]
})
export class AppRedisModule {}
