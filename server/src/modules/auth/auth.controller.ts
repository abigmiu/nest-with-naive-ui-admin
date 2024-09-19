import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';
import { Public } from '@/decorator/public.decorator';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    @ApiOperation({ summary: '登录' })
    login(@Body() body: LoginRequestDto, @Req() req: Request) {
        const { ip } = req;
        return this.authService.login(body, ip);
    }
}
