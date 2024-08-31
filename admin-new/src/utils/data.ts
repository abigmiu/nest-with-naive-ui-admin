export function listToTree<T extends Record<string, any> = any>(list: T[], id = 'id', pid = 'parentId', children = 'children'): T[] {
    const result: T[] = [];
    const listMap = list.reduce((map: Record<string, T>, item: T) => {
        map[item[id]] = item;
        return map;
    }, {});
    for (const item of list) {
        const parent = listMap[item[pid]];
        if (parent) {
            (parent[children] || ((parent as Record<string, any>)[children] = [])).push(item);
        }
        else {
            result.push(item);
        }
    }   
    return result;
}