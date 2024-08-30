import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleRequestDto } from './dto/create-role.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

  @Get('list')
    getList() {
        console.log('get role List');
        return this.roleService.getList();
    }

  @Get('simple-list')
  getSimpleList() {
      return this.roleService.getSimpleList();
  }

  @Post()
  create(@Body() body: CreateRoleRequestDto) {
      return this.roleService.createRole(body);
  }
}
