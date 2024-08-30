import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AppClsService } from '../cls/cls.service';

@Injectable()
export class AppLoggerService {
    constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly appClsService: AppClsService,
    ) {}

    info(message: string, payload?: any) {
        this.logger.info(message, {
            requestId: this.appClsService.getClsId(),
            data: payload,
        });
    }

    error(message: string, e?: Error, payload?: any) {
        const logData = {
            data: payload,
            error: e.message,
        };
        this.logger.error(
            message,
            {
                data: logData,
                requestId: this.appClsService.getClsId(),
            },
            e.stack,
        );
    }
}
