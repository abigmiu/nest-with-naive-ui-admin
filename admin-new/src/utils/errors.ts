export class IgnoreLastRequestError extends Error {
    constructor() {
        super('忽略上一次请求')
    }
}