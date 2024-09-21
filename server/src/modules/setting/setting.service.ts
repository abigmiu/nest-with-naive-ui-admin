import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateSettingRequestDto } from './dto/update-setting.dto';
import { QuerySettingResponseDto } from './dto/query-setting.dto';

@Injectable()
export class SettingService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    /** 更新字段 */
    async updateFiled(body: UpdateSettingRequestDto) {
        const foundData = await this.prismaService.settingConfig.findFirst({
            where: {
                filed: body.filed
            }
        });    
        if (!foundData) {
            throw new BadRequestException("字段不存在");
        }

        const updateResult = await this.prismaService.settingConfig.update({
            where: {
                filed: body.filed
            },
            data: {
                value: body.value
            }
        });
        
        return new QuerySettingResponseDto(updateResult);
    }

    async groupUpdate(body: UpdateSettingRequestDto[]) {
        for (let i = 0; i < body.length; i++) {
            await this.updateFiled(body[i]);
        }
    }

    /** 查找所有字段 */
    async getFileds() {
        const result = await this.prismaService.settingConfig.findMany();
        return result.map(item => new QuerySettingResponseDto(item));
    }
}
