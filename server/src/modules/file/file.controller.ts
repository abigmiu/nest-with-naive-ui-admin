import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileRecordRequestDto } from './dto/create-file.dto';
import { QueryFilePageRequestDto } from './dto/query-file.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('文件')
@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }


    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.upload(file);
    }

    @Post('add')
    async addFile(@Body() body: CreateFileRecordRequestDto) {
        return this.fileService.addRecord(body);
    }
    
    @Get('page')
    async getRecordPage(@Query() query: QueryFilePageRequestDto) {
        return this.fileService.getFileRecordPage(query);
    }
}
