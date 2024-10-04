import { Controller, Get } from '@nestjs/common';
import { AppUploadService } from './app-upload.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app 上传')
@ApiBearerAuth()
@Controller('app-upload')
export class AppUploadController {
    constructor(private readonly appUploadService: AppUploadService) {}

    @ApiOperation({summary: '获取七牛云上传参数'})
    @Get('qiniu')
    getQiniuUploadParams() {
        return this.appUploadService.getQiniuUploadCertificate();
    }
}
