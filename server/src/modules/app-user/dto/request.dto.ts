import { APP_REGISTER_TYPE } from "@/constant/business";
import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEnum, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";


export class AppLoginRequestDto {
    @IsPhoneNumber('CN', {
        message: '手机号不正确'
    })
    @ApiProperty({ title: '手机号' })
    phone: string;

    @IsString()
    @ApiProperty({ title: '密码' })
    password: string;
}

export class AppRegisterRequestDto {
    @IsEnum(APP_REGISTER_TYPE)
    @ApiProperty({
        title: '注册类型',
        enum: APP_REGISTER_TYPE,
        default: APP_REGISTER_TYPE.PHONE_PASSWORD,
    })
    type: APP_REGISTER_TYPE;

    @IsPhoneNumber('CN', {
        message: '手机号不正确'
    })
    @ApiProperty({ title: '手机号', description: '目前只支持86', default: '13334343434' })
    phone: string;

    @IsString()
    @ApiProperty({ title: '密码', default: '123456' })
    password: string;
}

/** 更新自己用户信息 */
@Exclude()
export class UpdateUserInfoRequestDto {
    @Expose()
    @ApiProperty({ title: '昵称', description: '1-20个字', required: false })
    @Length(1, 20, {
        message: '昵称为1-20个字符'
    })
    @IsOptional()
    nickname?: string;

    @Expose()
    @ApiProperty({ title: '简介', description: '1-200个字', required: false })
    @Length(1, 20, {
        message: '昵称为1-200个字符'
    })
    @IsOptional()
    intro?: string;


    @Expose()
    @ApiProperty({ title: '账号', description: '最多16个字，只允许包含字母、数字、下划线和点，30天内仅能修改一次', required: false })
    @IsString({
        message({value}) {
            if (!/^[a-zA-Z0-9_.]{1,16}$/.test(value))  {
                return '账号格式不正确';
            }
        },
    })
    @IsOptional()
    account?: string;
}