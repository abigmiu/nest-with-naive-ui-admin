import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as notifier from 'node-notifier';

import { AppModule } from '@/app/app.module';

import { emptyFunc } from '@/app/utils/func';

import { IAppConfig, IAppDevConfig } from '@/types/app/config';
import { join } from 'path';
import { blue, underline } from 'colorette';
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

    setupSwagger(app, `${host}:${port}`, configService);

    await app.listen(port, host);

    if (__IS_DEV__) {
        const url = await app.getUrl();
        console.log("app listen in:", blue(underline(url)));
        const notifyCompile = setupNotifyCompile(configService);
        notifyCompile();
    }

}
bootstrap();

/** 配置 swagger */
function setupSwagger(
    app: NestExpressApplication,
    appUrl: string,
    configService: ConfigService<IAppConfig & IAppDevConfig>,
) {
    const swaggerConfig = configService.get<IAppConfig['swagger']>('swagger');
    if (!swaggerConfig.enable) return;

    const { title, desc, url } = swaggerConfig;

    const documentBuilder = new DocumentBuilder()
        .setTitle(title)
        .setDescription(desc)
        .build();
    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup(url, app, document);
    const swaggerUrl = `${appUrl}/${url}`;

    console.log(`swagger: run in ${blue(underline(swaggerUrl))}`);
    console.log(`swagger json run in ${blue(underline(swaggerUrl + '-json'))}`);
}

/** 生成 编译通知函数 */
function setupNotifyCompile(
    configService: ConfigService<IAppConfig & IAppDevConfig>,
) {
    const notifyCompileConfig =
        configService.get<IAppDevConfig['notifyCompile']>('notifyCompile');
    if (!notifyCompileConfig?.enable) {
        return emptyFunc;
    }

    const { title, message } = notifyCompileConfig;

    return function () {
        notifier.notify(
            {
                title,
                message,
            },
            function (err) {
                if (err) {
                    console.error(`编译失败${title}-${message}`, err);
                }
            },
        );
    };
}
