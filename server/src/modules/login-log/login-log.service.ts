import { PrismaService } from '@/app/depend/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginLogService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    getUserRecentLog(userId: number) {
        return this.prismaService.loginLog.findMany({
            where: {
                userId,
            },
            orderBy: {
                id: 'desc'
            },
            take: 5,
        });
    }
}
