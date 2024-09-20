import { Role, User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserBaseQueryResponseDto implements User {
    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }
    password: string;

    @Expose()
    avatar: string;

    @Expose()
    id: number;
    @Expose()
    account: string;
    @Expose()
    username: string;
    @Expose()
    roleId: number;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
    @Expose()
    role: Role;
}
