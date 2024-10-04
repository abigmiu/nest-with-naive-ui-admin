import { AppUploadModule } from './app-upload/app-upload.module';
import { AppUserModule } from './app-user/app-user.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { FileModule } from './file/file.module';
import { ListModule } from './list/list.module';
import { LoginLogModule } from './login-log/login-log.module';
import { NotifyModule } from './notify/notify.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { SettingModule } from './setting/setting.module';
import { UserVideoModule } from './user-video/user-video.module';
import { UserModule } from './user/user.module';

const businessModules = [
    AppUserModule,
    AppUploadModule,

    AuthModule,
    UserVideoModule,
    UserModule,
    ListModule,
    PermissionModule,
    RoleModule,
    ArticleModule,
    FileModule,
    CommonModule,
    SettingModule,
    LoginLogModule,
    NotifyModule
];
export default businessModules;
