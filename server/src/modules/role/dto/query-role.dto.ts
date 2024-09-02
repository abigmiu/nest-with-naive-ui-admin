import { Permission, Role, RoleToPermission } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class QueryRoleListResponseDto implements Partial<
    Role & {
        permissions: Array<RoleToPermission & {
            permission: Permission
        }>
    }
> {
    constructor(data: Partial<Role>) {
        Object.assign(this, data);
    }

    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    remark?: string;

    @Expose({ name: 'permissions' })
    get transformedPermissions(): Permission[] {
        return this.permissions.map((item) => item.permission);
    }

    permissions?: Array<{ roleId: number; permissionId: number; } & { permission: Permission; }>;
}

@Exclude()
export class QueryRoleInfoResponseDto implements Partial<
    Role & {
        permissions: Array<RoleToPermission & {
            permission: Permission
        }>
    }
> {
    constructor(data: Partial<Role>) {
        Object.assign(this, data);
    }

    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    remark?: string;

    @Expose({ name: 'permissions' })
    get transformedPermissions(): Permission[] {
        return this.permissions?.map((item) => item.permission) || [];
    }

    @Expose({ name: 'permissionIds' })
    get permissionIds(): number[] {
        return this.permissions?.filter((item) => item.permission.type === 2).map((item) => item.permissionId) || [];
    }

    permissions?: Array<{ roleId: number; permissionId: number; } & { permission: Permission; }>;
}