import { Module } from '@nestjs/common';
import { AppUploadService } from './app-upload.service';
import { AppUploadController } from './app-upload.controller';

@Module({
    controllers: [AppUploadController],
    providers: [AppUploadService],
})
export class AppUploadModule {}
