import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';
import { UserModule } from './user/user.module';

const businessModules = [AuthModule, UserModule, ListModule];
export default businessModules;
