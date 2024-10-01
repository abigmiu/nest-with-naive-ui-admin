import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class CreateUserVideoRequestDto {
    @IsString()
    @ApiProperty({ description:"标题" })
    title: string;

    @IsString()
    @ApiProperty({ description:"简介" })
    desc: string;

    @IsUrl({ require_tld: false })
    videoUrl: string;

    // @IsUrl({ require_tld: false })
    // coverUrl: string;
}