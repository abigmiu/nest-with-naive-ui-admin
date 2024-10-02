import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
    HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        if (
            request.method === 'POST' &&
            response.statusCode === HttpStatus.CREATED
        ) {
            response.status(HttpStatus.OK);
        }

        return next.handle().pipe(
            map((data = null) => {
                return {
                    result: data,
                    code: 200,
                    message: '请求成功',
                };
            }),
        );
    }
}
