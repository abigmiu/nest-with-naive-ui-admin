import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppUserService } from './app-user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppLoginRequestDto, AppRegisterRequestDto } from './dto/request.dto';
import { AppLoginResponseDto, AppRegisterResponseDto, AppUserStatsResponseDto } from './dto/response.dto';
import { Public } from '@/decorator/public.decorator';
import { UserId } from '@/decorator/user.decorator';

@ApiTags("App用户")
@ApiBearerAuth()
@Controller('/app/user')
export class AppUserController {
    constructor(private readonly appUserService: AppUserService) { }

    @Public()
    @ApiOperation({ summary: "app用户登录" })
    @Post("login-phone-password")
    @ApiResponse({ status: 200, type: AppLoginResponseDto })
    appLogin(@Body() dto: AppLoginRequestDto): Promise<AppLoginResponseDto> {
        return this.appUserService.login(dto);
    }

    @Public()
    @ApiOperation({ summary: 'app用户注册' })
    @Post('register')
    @ApiResponse({ status: 200, type: AppRegisterResponseDto })
    appRegister(@Body() dto: AppRegisterRequestDto) {
        return this.appUserService.phonePasswordRegister(dto);
    }

    @ApiOperation({summary: '获取用户自己的统计数据'})
    @Get('stats')
    @ApiResponse({ status: 200, type: AppUserStatsResponseDto})
    getAppUserStats(@UserId() userId: number) {
        return this.appUserService.getUserStats(userId);
    }
}
