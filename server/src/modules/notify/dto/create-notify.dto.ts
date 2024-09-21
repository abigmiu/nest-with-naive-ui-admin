import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateNotifyRequestDto {
    @ApiProperty({ title: '标题' })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ title: '内容' })
    @IsString()
    @IsOptional()
    content: string;
}