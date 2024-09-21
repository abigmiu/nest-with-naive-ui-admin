declare module Express {
    interface Request {
        user: {
            id: number
        },
        token: string;
    }
}