import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRoleRequestDto {
  @IsString()
      name: string;
  @IsString()
  @IsOptional()
      remark?: string;

  @IsInt({ each: true })
      permissionIds: number[];
}
