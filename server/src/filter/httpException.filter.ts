import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppLoggerService } from '@/app/depend/logger/logger.service';

@Catch(HttpException)
export class BusinessHttpException implements ExceptionFilter {
  constructor(private readonly AppLoggerService: AppLoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    let message = exception.message;

    if (!message) {
      status > 500 ? (message = '服务器错误') : (message = '请求错误');
    }

    this.AppLoggerService.error(message, exception);

    response.status(HttpStatus.OK).json({
      result: null,
      code: status,
      message: message,
    });
  }
}
