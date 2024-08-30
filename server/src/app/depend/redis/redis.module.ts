import { IAppConfig } from '@/types/app/config';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@songkeys/nestjs-redis';

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
})
export class AppRedisModule {}
