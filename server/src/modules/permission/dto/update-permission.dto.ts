import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdatePermissionRequestDto {
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
