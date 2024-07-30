import { PUBLIC_KEY } from '@/constant/decorator';
import { SetMetadata } from '@nestjs/common';
export const Public = () => SetMetadata(PUBLIC_KEY, true);
