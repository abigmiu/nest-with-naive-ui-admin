import { PERMISSION_KEY } from '@/constant/decorator';
import { SetMetadata } from '@nestjs/common';

export const Permission = (permissionId: number) =>
    SetMetadata(PERMISSION_KEY, permissionId.toString());
