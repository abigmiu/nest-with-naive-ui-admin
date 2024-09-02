import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginRequestDto {
    @IsString()
    account: string;

    @IsString()
    password: string;
}

@Exclude()
export class LoginResponseDto implements Partial<User> {
    constructor(data: Partial<User & { token: string, menuPermissions: string[], actionPermissions: string[] }>) {
        Object.assign(this, data);
    }

    @Expose()
    username: string;

    @Expose()
    token: string;

    /** 权限列表 */
    @Expose()
    menuPermissions: string[];

    @Expose()
    actionPermissions: string[];
}
