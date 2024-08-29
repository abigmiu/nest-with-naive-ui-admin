import { Exclude } from 'class-transformer';
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

export class CreateUserResponseDto {
    constructor(data: CreateUserResponseDto) {
        Object.assign(this, data);
    }

    @Exclude()
    password: string;
}
