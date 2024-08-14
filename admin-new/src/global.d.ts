declare module "vue-router" {
    interface RouteMeta {
        permission?: string;
        order?: number;
        title?: string;
    }
}

export {}