import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { blue, underline } from 'colorette';

import { AppModule } from '@/app/app.module';
import { IAppConfig, IAppDevConfig } from '@/types/app/config';
import { join } from 'path';

import { __IS_DEV__ } from './app/constant/process';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error']
    });
    const configService = app.get(ConfigService<IAppConfig & IAppDevConfig>);

    const staticFileUrl = configService.get<string>('fileStaticUrl');
    const fileStoragePath = configService.get<string>('fileStoragePath');
    app.useStaticAssets(join(process.cwd(), fileStoragePath), {
        prefix: staticFileUrl,
    });

    const { port, host, apiPrefix } = configService.get<IAppConfig['app']>('app');
    if (apiPrefix) {
        app.setGlobalPrefix(apiPrefix);
    }

    if (__IS_DEV__) {
        const { setupNotifyCompile, setupSwagger } = await import('./dev');
        setupSwagger(app, `${host}: ${port}`, configService);
        await app.listen(port, host);
        const notifyCompile = setupNotifyCompile(configService);
        notifyCompile();
    } else {
        await app.listen(port, host);
    }

    const url = await app.getUrl();
    console.log("app listen in:", blue(underline(url)));
}
bootstrap();

