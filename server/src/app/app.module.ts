import {
    ClassSerializerInterceptor,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClsMiddleware } from 'nestjs-cls';
import { AppRequestMiddleware } from '@/middleware/request-log.middleware';
import { AppConfigModule } from './depend/config/config.module';
import { AppClsModule } from './depend/cls/cls.module';
import { AppLoggerModule } from './depend/logger/logger.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseTransformInterceptor } from '@/interceptor/response.interceptor';
import { AppLoggerService } from './depend/logger/logger.service';
import { BusinessHttpException } from '@/filter/httpException.filter';
import { RequestValidationPipe } from '@/pipe/request-validation.pipe';
import { LoginGuard } from '@/guard/login.guard';
import businessModules from '@/modules';
import { PrismaModule } from './depend/prisma/prisma.module';
import { RedisModule } from '@songkeys/nestjs-redis';
import { PermissionGuard } from '@/guard/permission.guard';
import { AppRedisModule } from './depend/redis/redis.module';
import { extname, join } from 'path';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination(req, file, callback) {
                    console.log(file);
                    callback(null, join(process.cwd(), 'upload'));
                },
                filename(req, file, callback) {
                    console.log(file);
                    const filename = `${v4()}${extname(file.originalname)}`;
                    return callback(null, filename);
                }
            }),
            
        }),
        AppConfigModule,
        AppClsModule,
        AppLoggerModule,
        PrismaModule,
        AppRedisModule,
        ...businessModules,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseTransformInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        {
            provide: APP_PIPE,
            useClass: RequestValidationPipe,
        },
        {
            provide: APP_GUARD,
            useClass: LoginGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PermissionGuard,
        },
        {
            provide: APP_FILTER,
            useFactory(appLoggerService: AppLoggerService) {
                return new BusinessHttpException(appLoggerService);
            },
            inject: [AppLoggerService],
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ClsMiddleware).forRoutes('*');
        consumer.apply(AppRequestMiddleware).forRoutes('*');
    }
}
