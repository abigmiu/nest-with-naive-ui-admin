import { IsInt, IsString } from "class-validator";

export class EditUserDto {
    @IsInt()
    id: number;

    @IsString()
    username: string;

    @IsString()
    account: string;

    @IsString()
    roleId: number;
    
}