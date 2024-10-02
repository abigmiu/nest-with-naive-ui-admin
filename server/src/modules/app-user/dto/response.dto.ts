import { SEX_TYPE } from "@/constant/business";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AppLoginResponseDto {
    constructor(data: Partial<AppLoginResponseDto>) {
        Object.assign(this, data);
    }

    @Expose()
    @ApiProperty({ title: 'id' })
    id: number;

    @Expose()
    @ApiProperty({ title: 'token' })
    token: string;

    @Expose()
    @ApiProperty({ title: '创建日期' })
    createdAt: Date;

    @Expose()
    @ApiProperty({ title: '更新日期' })
    updatedAt: Date;

    @Expose()
    @ApiProperty({ title: '昵称' })
    nickname: string;

    @Expose()
    @ApiProperty({ title: '账号' })
    account: string;

    @Expose()
    @ApiProperty({ title: '头像链接' })
    avatar: string;

    @Expose()
    @ApiProperty({ title: '简介' })
    intro: string | null;

    @Expose()
    @ApiProperty({ title: '性别', enum: SEX_TYPE })
    sex: SEX_TYPE;

    @Expose()
    @ApiProperty({ title: '生日' })
    birth: Date;

    @Expose()
    @ApiProperty({ title: '获取的点赞数' })
    likeCount: number;

    @Expose()
    @ApiProperty({ title: '朋友数' })
    friendCount: number;

    @Expose()
    @ApiProperty({ title: '关注数' })
    followCount: number;

    @Expose()
    @ApiProperty({ title: '粉丝数' })
    fansCount: number;
}

@Exclude()
export class AppRegisterResponseDto {
    constructor(data: Partial<AppRegisterResponseDto>) {
        Object.assign(this, data);
    }

    @Expose()
    @ApiProperty({ title: 'token' })
    token: string;

    @Expose()
    @ApiProperty({ title: 'id' })
    id: number;

    @Expose()
    @ApiProperty({ title: '创建日期' })
    createdAt: Date;

    @Expose()
    @ApiProperty({ title: '更新日期' })
    updatedAt: Date;

    @Expose()
    @ApiProperty({ title: '昵称' })
    nickname: string;

    @Expose()
    @ApiProperty({ title: '账号' })
    account: string;

    @Expose()
    @ApiProperty({ title: '头像链接' })
    avatar: string;

    @Expose()
    @ApiProperty({ title: '简介' })
    intro: string | null;

    @Expose()
    @ApiProperty({ title: '性别', enum: SEX_TYPE })
    sex: SEX_TYPE;

    @Expose()
    @ApiProperty({ title: '生日' })
    birth: Date;

    @Expose()
    @ApiProperty({ title: '获取的点赞数' })
    likeCount: number;

    @Expose()
    @ApiProperty({ title: '朋友数' })
    friendCount: number;

    @Expose()
    @ApiProperty({ title: '关注数' })
    followCount: number;

    @Expose()
    @ApiProperty({ title: '粉丝数' })
    fansCount: number;
}