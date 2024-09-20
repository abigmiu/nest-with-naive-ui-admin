import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginRequestDto {
    @ApiProperty({ title: '账号', default: 'admin' })
    @IsString()
    account: string;

    @ApiProperty({ title: '密码', default: 'e10adc3949ba59abbe56e057f20f883e', description: '默认值是123456md5' })
    @IsString()
    password: string;
}

@Exclude()
export class LoginResponseDto implements Partial<User> {
    constructor(data: Partial<LoginResponseDto>) {
        Object.assign(this, data);
    }

    @ApiProperty({ title: '头像地址' })
    @Expose()
    avatar: string | null;

    @ApiProperty({ title: '用户名' })
    @Expose()
    username: string;

    @ApiProperty({ title: 'token' })
    @Expose()
    token: string;

    /** 权限列表 */
    @ApiProperty({ title: '权限列表' })
    @Expose()
    permissions: string[];
    
    @ApiProperty({ title: '创建时间' })
    @Expose()
    createdAt: Date;
}
