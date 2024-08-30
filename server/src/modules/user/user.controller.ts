import { Body, Controller, Get, Post, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UserResetPasswordDto } from './dto/reset-password.dto';
import { UserImportService } from './user-import.service';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserBaseQueryResponseDto } from './dto/query-user.dto';

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
        const data = await this.userService.getUserBaseInfo(Number(userId));
        return new UserBaseQueryResponseDto(data);
    }

    @Get('page')
    getUserPageData() {
        return this.userService.getUserPageData();
    }
}
