import { IAppConfig, IAppDevConfig } from '@/types/app/config';

type IConfig = IAppConfig & IAppDevConfig;

const config: IConfig = {
    notifyCompile: {
        enable: true,
        title: '管理系统',
        message: '编译成功',
    },
    swagger: {
        enable: true,
        title: '管理系统',
        desc: '文档',
        url: 'swagger',
    },
    app: {
        port: 3001,
        host: '0.0.0.0', // 这样局域网可以访问
        apiPrefix: '/api',
    },
    jwt: {
        secret: '123456',
        expiresIn: '30d',
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
    fileStaticUrlDomain: 'http://localhost:3000/static/',
    qiniu: {
        accessKey: process.env.QINIU_ACCESS_KEY,
        secretKey: process.env.QINIU_SECRET_KEY,
        bucket: process.env.QINIU_BUCKET,
        uploadUrl: 'https://upload-z2.qiniup.com',
        accessUrl: 'http://naive-short-admin.deffun.top'
    }
};

export default config;
