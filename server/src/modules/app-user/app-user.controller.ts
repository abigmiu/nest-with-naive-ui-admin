import { Body, Controller, Post } from '@nestjs/common';
import { AppUserService } from './app-user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppLoginRequestDto, AppRegisterRequestDto } from './dto/request.dto';
import { AppLoginResponseDto, AppRegisterResponseDto } from './dto/response.dto';
import { Public } from '@/decorator/public.decorator';

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
}
