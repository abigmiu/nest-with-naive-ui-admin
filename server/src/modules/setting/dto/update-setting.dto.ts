import { ApiProperty } from "@nestjs/swagger";

export class UpdateSettingRequestDto {
    @ApiProperty({ title: '字段名' })
    filed: string;

    @ApiProperty({ title: '值', description: '需要为json格式' })
    value: string;
}