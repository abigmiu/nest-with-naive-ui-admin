import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionRequestDto } from './dto/create-permission.dto';
import { Public } from '@/decorator/public.decorator';
import { UpdatePermissionRequestDto } from './dto/update-permission.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('权限')
@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Get('list')
    async getPermissionList() {
        return this.permissionService.getList();
    }

    /** 获取权限简单列表 */
    @Get('simple-list')
    async getSimplePermissionList() {
        return this.permissionService.getSimpleList();
    }

    @Post('update')
    async updatePermission(
      @Query() query: { id: string },
      @Body() body: UpdatePermissionRequestDto,
    ) {
        return this.permissionService.update(+query.id, body);
    }
}
