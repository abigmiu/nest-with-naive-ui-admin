import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import * as notifier from 'node-notifier';

import { AppModule } from '@/app/app.module';

import { IAppConfig, IAppDevConfig } from '@/types/app/config';
import { emptyFunc } from '@/app/utils/func';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<IAppConfig & IAppDevConfig>);
  const notifyCompile = setupNotifyCompile(configService);
  await app.listen(3000, () => {
    notifyCompile();
  });
}
bootstrap();

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
