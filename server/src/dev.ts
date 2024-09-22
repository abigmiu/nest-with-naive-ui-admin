import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { blue, underline } from 'colorette';
import * as notifier from 'node-notifier';
import { emptyFunc } from './app/utils/func';
import { IAppConfig, IAppDevConfig } from './types/app/config';


/** 配置 swagger */
export function setupSwagger(
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
export function setupNotifyCompile(
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
