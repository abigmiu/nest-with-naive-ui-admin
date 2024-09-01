import { Injectable } from '@nestjs/common';
import { InjectRedis, RedisService } from '@songkeys/nestjs-redis';
import { Redis, RedisKey } from 'ioredis';

@Injectable()
export class AppRedisService {
    public client: Redis;

    constructor(
        private readonly redisService: RedisService
    ) {
        this.client = this.redisService.getClient();
    }

    /** 存json */
    setJson<T = any>(key: RedisKey, value: T) {
        const str = JSON.stringify(value);
        return this.client.set(key, str);
    }

    /** 获取json, 解析错误返回null */
    async getJson<T = any>(key: RedisKey): Promise<T | null> {
        const data = await this.client.get(key);
        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    }
}
