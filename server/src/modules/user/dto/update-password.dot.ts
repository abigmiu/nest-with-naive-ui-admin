import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePasswordRequestDto {
    @ApiProperty({ title: '密码' })
    @IsString()
    password: string;
}