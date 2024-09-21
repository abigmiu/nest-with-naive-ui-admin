import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNotifyRequestDto } from './dto/create-notify.dto';
import { QueryNotifyDto } from './dto/query-notify.dto';

@ApiTags('通知')
@Controller('notify')
export class NotifyController {
    constructor(private readonly notifyService: NotifyService) { }

    @ApiOperation({ summary: '获取已经发布的通知' })
    @Get('published')
    getPublished() {
        return this.notifyService.getPublishedList();
    }

    @ApiOperation({ summary: '发布通知' })
    @Post('create')
    create(@Body() body: CreateNotifyRequestDto) {
        return this.notifyService.createNotify(body);
    }

    @ApiOperation({ summary: '通知列表查看' })
    @Get('page')
    getPage(@Query() query: QueryNotifyDto) {
        return this.notifyService.getPageData(query);
    }
}
