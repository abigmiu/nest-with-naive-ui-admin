import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { v4 } from 'uuid';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination(req, file, callback) {
                    callback(null, join(process.cwd(), 'upload'));
                },
                filename(req, file, callback) {
                    const filename = `${v4()}${extname(file.originalname)}`;
                    return callback(null, filename);
                }
            })
        })

    ],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule { }
