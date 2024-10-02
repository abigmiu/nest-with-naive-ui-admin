import { APP_REGISTER_TYPE } from "@/constant/business";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsPhoneNumber, IsString } from "class-validator";


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