export function mergeRedisKey(...keys: string[]) {
    return keys.join(':');
}