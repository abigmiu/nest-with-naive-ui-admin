import { Module } from '@nestjs/common';
import { UserVideoService } from './user-video.service';
import { UserVideoController } from './user-video.controller';

@Module({
    controllers: [UserVideoController],
    providers: [UserVideoService],
})
export class UserVideoModule { }
