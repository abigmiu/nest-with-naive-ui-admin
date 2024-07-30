import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLoggerService } from '@/app/depend/logger/logger.service';
import { Request } from 'express';

@Injectable()
export class AppRequestMiddleware implements NestMiddleware {
  constructor(private readonly appLoggerService: AppLoggerService) {}

  use(req: Request, res: any, next: () => void) {
    const { headers, url, baseUrl, body, query, ip } = req;
    const logData = {
      headers,
      url,
      baseUrl,
      body,
      query,
      ip,
    };

    this.appLoggerService.info(`开始请求`, logData);
    next();
  }
}
