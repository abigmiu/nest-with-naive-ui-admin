import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class QuerySettingResponseDto {
    constructor(data: Partial<QuerySettingResponseDto>) {
        Object.assign(this, data);
    }

    @ApiProperty({ title: '字段名' })
    @Expose()
    filed: string;

    @ApiProperty({ title: '值', description: 'json 字符串， 需要应用端自己转一下' })
    @Expose()
    value: any;

    @ApiProperty({ title: '创建时间' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ title: '更新时间' })
    @Expose()
    updatedAt: Date;
}