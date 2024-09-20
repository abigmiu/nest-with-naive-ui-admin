import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateProfileRequestDto {
    @ApiProperty({ title: '用户昵称', required: false, })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty({ title: '头像地址', required: false })
    @IsUrl()
    @IsOptional()
    avatar?: string;
}