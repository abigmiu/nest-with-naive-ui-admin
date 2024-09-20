import { Body, Controller, Get, Post, Query, Req, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UserResetPasswordDto } from './dto/reset-password.dto';
import { UserImportService } from './user-import.service';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserBaseQueryResponseDto } from './dto/query-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProfileRequestDto } from './dto/update-profile.dto';
import { UpdatePasswordRequestDto } from './dto/update-password.dot';

@ApiTags('用户')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly userImportService: UserImportService
    ) { }

    /** 创建一个用户 */
    @Post()
    createUser(@Body() dto: CreateUserRequestDto) {
        return this.userService.createUser(dto);
    }

    /** 重置用户密码 */
    @Post('reset-password')
    resetPassword(@Body() dto: UserResetPasswordDto) {
        return this.userService.resetUserPassword(dto.userId);
    }

    @Get('import-template')
    async getImportUserSheet(@Res() res: Response) {
        const stream = await this.userImportService.getImportUserTemplate();

        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', `attachment; filename="${encodeURIComponent('用户导入模板')}.xlsx"`);
        res.send(stream);
    }

    @Get('export')
    async exportUserData(@Res() res: Response) {
        const stream = await this.userImportService.getExportUserFile();
        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', `attachment; filename="${encodeURIComponent('用户导出')}-${Date.now()}.xlsx"`);
        res.send(stream);
    }

    @Post('import')
    @UseInterceptors(FileInterceptor('file'))
    async importUser(@UploadedFile() file: Express.Multer.File) {
        const buffer = file.buffer;
        return this.userImportService.importFile(buffer);

    }



    @Get('info')
    getUserInfo() {
        return this.userService.getUserInfo();
    }

    @Get('base-info')
    async getUserBaseInfo(@Query('userId') userId: string) {
        return this.userService.getUserBaseInfo(Number(userId));
       
        
    }

    @Get('page')
    getUserPageData() {
        return this.userService.getUserPageData();
    }

    @ApiOperation({ summary: '更新自己的用户信息', description: '读取的token信息，只能修改自己的用户信息' })
    @Post('update-profile')
    updateProfile(@Body() body: UpdateProfileRequestDto, @Req() req: Request) {
        const { user } = req;
        return this.userService.updateProfile(user.id, body);
    }

    @ApiOperation({ summary: '修改用户密码', description: '读取的token'})
    @Post('update-password')
    updatePassword(@Body() body: UpdatePasswordRequestDto, @Req() req: Request) {
        const { user: { id } } = req;
        return this.userService.updatePassword(id, body);
    }
}
