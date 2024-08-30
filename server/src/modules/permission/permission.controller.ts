import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionRequestDto } from './dto/create-permission.dto';
import { Public } from '@/decorator/public.decorator';
import { UpdatePermissionRequestDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

  @Get('list')
    async getPermissionList() {
        return this.permissionService.getList();
    }

  @Post('update')
  async updatePermission(
    @Query() query: { id: string },
    @Body() body: UpdatePermissionRequestDto,
  ) {
      return this.permissionService.update(+query.id, body);
  }
}
