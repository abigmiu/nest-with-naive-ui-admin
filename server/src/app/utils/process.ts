import { IProcessEnv } from '@/types/process';

/** 获取环境变量 */
export function getProcessEnv(variable: IProcessEnv) {
  return process.env[variable];
}
