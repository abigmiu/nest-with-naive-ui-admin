import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { FileModule } from './file/file.module';
import { ListModule } from './list/list.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

const businessModules = [
    AuthModule,
    UserModule,
    ListModule,
    PermissionModule,
    RoleModule,
    ArticleModule,
    FileModule,
    CommonModule,
];
export default businessModules;
