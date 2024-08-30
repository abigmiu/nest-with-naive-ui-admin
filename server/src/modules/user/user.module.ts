import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleService } from '../role/role.service';
import { UserImportService } from './user-import.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { v4 } from 'uuid';
import { CommonService } from '../common/common.service';

@Module({
    imports: [
       
    ],
    controllers: [UserController],
    providers: [UserService, RoleService, UserImportService, CommonService],
})
export class UserModule {}
