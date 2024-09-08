import { Exclude, Expose, Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";



/** 上传文件返回 */

@Exclude()
export class UploadFileResponseDto {
    constructor(data: Partial<UploadFileResponseDto>) {
        Object.assign(this, data);
    }

    @Expose()
    id: number;

    @Expose()
    url: string;
}

export class CreateFileRecordRequestDto {
    @IsInt()
    fileId: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    remark?: string;

    @IsString({ each: true })
    @IsOptional()
    tags?: string[];
}