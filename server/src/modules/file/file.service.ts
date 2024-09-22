import { Injectable } from '@nestjs/common';
import { CreateFileRecordRequestDto,  UploadFileResponseDto } from './dto/create-file.dto';
import * as sharp from 'sharp';
import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { QueryFilePageRequestDto, QueryFileRecordResponseDto } from './dto/query-file.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
    ) { }

    async addRecord(body: CreateFileRecordRequestDto) {
        const toSaveData: Prisma.FileRecordCreateInput = {
            file: {
                connect: {
                    id: body.fileId
                }
            },
        };
     
    
        if (body.remark) {
            toSaveData.remark = body.remark;
        }
        if (body.tags) {
            toSaveData.tags = JSON.stringify(body.tags);
        }

        const savedData = await this.prismaService.fileRecord.create({
            data: toSaveData
        });
        return savedData;
    }

    async upload(file: Express.Multer.File) {
        const localPath = file.path.slice(file.destination.length + 1);
        const urlDomain = this.configService.get<string>('fileStaticUrlDomain');
        const url = urlDomain + localPath;
        const toSaveData: Prisma.FileCreateInput = {
            location: localPath,
            url: url,
            fileName: file.originalname,
            mimetype: file.mimetype,
        };
        // 图片宽高处理
        if (file.mimetype.startsWith('image/')) {
            const { width, height } = await sharp(file.path).metadata();
            toSaveData.height = height;
            toSaveData.width = width;
        }

        const savedData = await this.prismaService.file.create({
            data: toSaveData
        });

        return new UploadFileResponseDto({
            id: savedData.id,
            url: savedData.url
        });
    }

    async getFileRecordPage(query: QueryFilePageRequestDto) {
        const where: Prisma.FileRecordWhereInput = {
        };
        if (query.realtime && query.firstId) {
            where.id = {
                lt: query.firstId
            };
        }
        
        
        const data = await this.prismaService.getPageData(
            this.prismaService.fileRecord,
            query,
            {
                where,
                orderBy: {
                    id: 'desc'
                },
                select: {
                    file: {
                        select: {
                            url: true,
                            id: true,
                            width: true,
                            height: true,
                            fileName: true,
                        }
                    },
                    id: true,
                    remark: true,
                    tags: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        );
        data.list.map(item => {
            item.tags = item.tags ? JSON.parse(item.tags) : [];
            return new QueryFileRecordResponseDto(item);
        });
        return data;
    }


}
