export interface IAppDevConfig {
  /** 通知编译完成 */
  notifyCompile:
    | {
        enable: false;
      }
    | {
        enable: true;
        title: string;
        message: string;
      };
}

export interface IAppConfig {
  swagger:
    | {
        enable: false;
      }
    | {
        enable: true;
        title: string;
        desc: string;
        url: string;
      };

  app: {
    /** 运行的端口 */
    port: number;
    /** 运行的host */
    host: string;
    /** 接口地址 */
    apiPrefix: string;
  };

  jwt: {
    secret: string;
    expiresIn: string;
  };

  redis: {
    host: string;
    port: number;
  };

  hamcKey: string;
  incorrectRetryTimes: number;
  incorrectRetryExpire: number;
}
