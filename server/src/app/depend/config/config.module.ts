import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import loadConfig from '@/app/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfig],
    }),
  ],
})
export class AppConfigModule {}
