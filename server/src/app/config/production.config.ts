import { IAppConfig, IAppDevConfig } from '@/types/app/config';

type IConfig = IAppConfig & IAppDevConfig;

const config: IConfig = {
    notifyCompile: {
        enable: false,
    },
    swagger: {
        enable: false,
    },
    app: {
        port: 3000,
        host: '127.0.0.1', // 这样局域网可以访问
        apiPrefix: '/api',
    },
    jwt: {
        secret: '123456',
        expiresIn: '30m',
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
    },
    hamcKey: process.env.hmacKey,
    incorrectRetryTimes: 5,
    incorrectRetryExpire: 5 * 60,
    fileStaticUrl: '/static/',
    fileStoragePath: 'upload',
    fileStaticUrlDomain: 'http://naive-admin-static.deffun.top',
};

export default config;
