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

export interface IAppConfig {}
