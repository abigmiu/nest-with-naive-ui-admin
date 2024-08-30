import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';
import { PermissionModule } from './permission/permission.module';
import { PermissionService } from './permission/permission.service';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

const businessModules = [
    AuthModule,
    UserModule,
    ListModule,
    PermissionModule,
    RoleModule,
];
export default businessModules;
