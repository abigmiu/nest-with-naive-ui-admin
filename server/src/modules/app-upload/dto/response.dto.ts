import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

/** 上传配置响应 */
@Exclude()
export class AppUploadResponseDto {
    constructor(data: Partial<AppUploadResponseDto>) {
        Object.assign(this, data);
    }

    @Expose()
    @ApiProperty({ title: "访问链接" })
    accessUrl: string;

    @Expose()
    @ApiProperty({title: '上传地址'})
    uploadUrl: string;

    @Expose()
    @ApiProperty({title: '上传表单的文件key'})
    fileFiled: string;

    @Expose()
    @ApiProperty({title: '其他表单配置'})
    form: Record<string, any>;

    @Expose()
    @ApiProperty({title: '请求头'})
    headers: Record<string, any>;

    @Expose()
    @ApiProperty({title: '请求方法'})
    method: 'GET' | 'POST';
}