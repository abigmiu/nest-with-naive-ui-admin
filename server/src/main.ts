import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as notifier from 'node-notifier';

import { AppModule } from '@/app/app.module';

import { emptyFunc } from '@/app/utils/func';

import { IAppConfig, IAppDevConfig } from '@/types/app/config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService<IAppConfig & IAppDevConfig>);

    const notifyCompile = setupNotifyCompile(configService);
    setupSwagger(app, configService);

    const { port, host, apiPrefix } = configService.get<IAppConfig['app']>('app');
    app.setGlobalPrefix(apiPrefix);

    await app.listen(port, host, () => {
        notifyCompile();
    });
}
bootstrap();

/** 配置 swagger */
function setupSwagger(
    app: NestExpressApplication,
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
                    console.error(`失败${title}-${message}`, err);
                }
            },
        );
    };
}
