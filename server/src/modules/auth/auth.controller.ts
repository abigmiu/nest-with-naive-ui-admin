import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { Public } from '@/decorator/public.decorator';
import { Request } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    @ApiOperation({ summary: '登录' })
    @ApiOkResponse({ type: LoginResponseDto })
    login(@Body() body: LoginRequestDto, @Req() req: Request): Promise<LoginResponseDto> {
        const { ip } = req;
        return this.authService.login(body, ip);
    }

    @Post('logout')
    @ApiOperation({ summary: '退出登录' })
    @ApiOkResponse()
    logout(@Req() req: Request) {
        const { ip, user } = req; 
        return this.authService.logout(user.id, ip);
    }
}
