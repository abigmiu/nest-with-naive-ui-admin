import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserVideoService } from './user-video.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserVideoRequestDto } from './dto/CreateUserVideo';
import { QueryUserVideoRequestDto } from './dto/QueryUserVideo';
import {  UserId } from '@/decorator/user.decorator';

@ApiBearerAuth()
@ApiTags("用户视频")
@Controller('user-video')
export class UserVideoController {
    constructor(private readonly userVideoService: UserVideoService) { }

    @Post('create')
    @ApiOperation({ summary: "用户创建视频" })
    createVideo(@Body() dto: CreateUserVideoRequestDto, @UserId() userId: number) {
        return this.userVideoService.createVideo(dto, userId);
    }

    @Get('query-page')
    @ApiOperation({ summary: '查询用户自己的视频' })
    queryPageUserVideo(@Query() query: QueryUserVideoRequestDto, @UserId() userId: number) {
        return this.userVideoService.queryVideoPage(query, userId);
    } 
}
