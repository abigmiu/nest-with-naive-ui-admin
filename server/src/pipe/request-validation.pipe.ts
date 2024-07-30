import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RequestValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      transform: true,
      whitelist: true,
    });

    if (errors.length > 0) {
      const constraints = errors[0].constraints;
      const firstErrMsg = Object.values(constraints)[0];
      throw new BadRequestException(firstErrMsg);
    }
    return object;
  }

  private toValidate(metatype: any): boolean {
    const types: ((...args: any[]) => any)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}
