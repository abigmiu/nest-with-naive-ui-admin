import { IsInt, IsOptional, IsString } from "class-validator";

export class EditRoleRequestDto {
    @IsInt()
    roleId: number;

    @IsString()
    name: string;
    
    @IsString()
    @IsOptional()
    remark?: string;

    @IsInt({ each: true })
    permissionIds: number[];
}