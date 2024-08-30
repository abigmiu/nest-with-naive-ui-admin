import { IsBoolean, IsString, IsInt, IsOptional } from 'class-validator';

export class CreatePermissionRequestDto {
  @IsString()
      name: string;

  @IsInt()
      type: number;

  @IsInt()
  @IsOptional()
      parentId?: number;

  @IsString()
      value: string;
}
