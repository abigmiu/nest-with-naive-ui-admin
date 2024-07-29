import { IAppConfig, IAppDevConfig } from '@/types/app/config';

type IConfig = IAppConfig & IAppDevConfig;

const config: IConfig = {
  notifyCompile: {
    enable: true,
    title: '管理系统',
    message: '编译成功',
  },
};

export default config;
