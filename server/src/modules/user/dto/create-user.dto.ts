import { Role, User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserRequestDto {
    @IsString()
        username: string;
    @IsString()
        account: string;
    @IsString()
    @IsOptional()
        password?: string;

    @IsInt()
        roleId: number;
}

export class CreateUserResponseDto implements Partial<User> {
    constructor(data: Partial<User>) {
        Object.assign(this, data);
        console.log(this);
    }

    username: string;

    @Exclude()
        role: Role;

    @Exclude()
        password?: string;

    @Expose()
    get roleName() {
        return this.role.name;
    }
}
