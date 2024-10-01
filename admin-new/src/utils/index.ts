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

/** 文件下载 */
export function download(data: any, filename?: string) {
    const blob = new Blob([data]);

    // 创建下载链接
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || '下载'; // 设置下载的文件名

    // 模拟点击触发下载
    document.body.appendChild(link);
    link.click();

    // 下载后移除元素并清理 URL
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
}

export function getHttpHeaderFilename(headerValue: string) {
    const filenameRegex = /filename\*?="?([^"]+)"?/;
    const matches = headerValue.match(filenameRegex);

    if (matches && matches[1]) {
        // 获取并解码文件名
        const encodedFilename = matches[1];
        const decodedFilename = decodeURIComponent(encodedFilename);
        return decodedFilename; // 输出：用户导入模板.xlsx
    } return '';
}