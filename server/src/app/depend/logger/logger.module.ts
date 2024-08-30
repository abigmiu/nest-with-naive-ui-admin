import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './logger.service';
import 'winston-daily-rotate-file';
import {
    utilities as nestWinstonModuleUtilities,
    WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

@Global()
@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike('MyApp', {
                            colors: true,
                            prettyPrint: true,
                            processId: true,
                            appName: true,
                        }),
                    ),
                }),
                new winston.transports.DailyRotateFile({
                    dirname: 'logs/error',
                    filename: 'error/%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    level: 'error',
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.json(),
                    ),
                }),
                new winston.transports.DailyRotateFile({
                    dirname: 'logs',
                    filename: '%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    format: winston.format.combine(
                        winston.format((info) => {
                            if (info.level === 'error') {
                                return false;
                            }
                            return info;
                        })(),
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.json(),
                    ),
                }),
            ],
        }),
    ],
    providers: [AppLoggerService],
    exports: [AppLoggerService],
})
export class AppLoggerModule {}
