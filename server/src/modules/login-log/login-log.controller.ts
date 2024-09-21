import { Controller, Get, Req } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('登录日志')
@Controller('login-log')
export class LoginLogController {
    constructor(private readonly loginLogService: LoginLogService) { }

    @ApiOperation({ summary: '获取自己的最近登录日志' })
    @Get('recent')
    getUserRecentLog(@Req() request: Request) {
        const { user: { id } } = request;
        return this.loginLogService.getUserRecentLog(id);
    }
}
