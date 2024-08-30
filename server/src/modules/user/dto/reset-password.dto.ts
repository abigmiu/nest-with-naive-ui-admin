import { IsInt } from "class-validator";

export class UserResetPasswordDto {
    @IsInt()
        userId: number;
}