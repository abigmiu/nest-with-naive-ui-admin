import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingService } from './setting.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateSettingRequestDto } from './dto/update-setting.dto';

@ApiTags('配置')
@Controller('setting')
export class SettingController {
    constructor(private readonly settingService: SettingService) {}

    @ApiOperation({ summary: '更新配置' })
    @Post('update')
    updateFiled(@Body() body: UpdateSettingRequestDto) {
        return this.settingService.updateFiled(body);
    }

    @ApiOperation({ summary: '批量更新配置' })
    @Post('group-update')
    groupUpdate(@Body() body: UpdateSettingRequestDto[]) {
        return this.settingService.groupUpdate(body);
    }

    @ApiOperation({ summary: '获取配置列表' })
    @Get('list')
    getFileds() {
        return this.settingService.getFileds();
    }
}
