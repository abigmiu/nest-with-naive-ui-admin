import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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

@Module({
  imports: [
    AppConfigModule,
    AppClsModule,
    AppLoggerModule,
    PrismaModule,
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
      provide: APP_PIPE,
      useClass: RequestValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
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
