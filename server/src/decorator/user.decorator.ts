import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const UserId = createParamDecorator(
    (data: { required: boolean } = {
        required: true
    }, ctx: ExecutionContext) => {
        const { required } = data;
        const request = ctx.switchToHttp().getRequest<Request>();
        if (required && !request.user?.id) {
            throw new BadRequestException('用户不存在');
        }
        return request.user?.id;
    }
);