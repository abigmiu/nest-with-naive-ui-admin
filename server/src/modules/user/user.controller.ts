import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

  /** 创建一个用户 */
  @Post()
    createUser(@Body() dto: CreateUserRequestDto) {
        return this.userService.createUser(dto);
    }

  @Get('info')
  getUserInfo() {
      return this.userService.getUserInfo();
  }

  @Get('page')
  getUserPageData() {
      return this.userService.getUserPageData();
  }
}
