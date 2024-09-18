import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleRequestDto } from './dto/create-role.dto';
import { EditRoleRequestDto } from './dto/edit-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('角色')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get('list')
    getList() {
        console.log('get role List');
        return this.roleService.getList();
    }

    @Get('info')
    getRoleInfo(@Query('roleId') roleId: string) {
        return this.roleService.getRoleInfo(Number(roleId));
    }

    @Get('simple-list')
    getSimpleList() {
        return this.roleService.getSimpleList();
    }

    @Post()
    create(@Body() body: CreateRoleRequestDto) {
        return this.roleService.createRole(body);
    }

    @Post('edit')
    editRole(@Body() body: EditRoleRequestDto) {
        return this.roleService.updateRole(body);
    }
}
