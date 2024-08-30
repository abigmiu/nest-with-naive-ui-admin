import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import loadConfig from '@/app/config';
import { join }  from 'path';

const cwd = process.cwd();
const envFile = `${join(cwd, '.env.' + process.env.NODE_ENV)}`

console.log("🚀 ~ envFile:", envFile);
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [loadConfig],
            envFilePath: [`${join(cwd, '.env')}`, envFile],
        }),
    ],
})
export class AppConfigModule {}
