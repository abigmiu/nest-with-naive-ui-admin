<template>
    <NMenu
        :options="menuOptions"
        :inverted="true"
        :on-update:value="onMenuItemClick"
    ></NMenu>
</template>

<script lang="ts" setup>
import { NMenu, type MenuOption } from 'naive-ui';
import { ref } from 'vue';
import { useRouter, type RouteRecordNormalized, type RouteRecordRaw } from 'vue-router';

const router = useRouter();

// #start 树状路由处理
function getNormalizedRouteRecordChild(route: RouteRecordNormalized) {
    console.log("🚀 ~ getNormalizedRouteRecordChild ~ route:", route);
    const childrenRecord = new Map<string, RouteRecordRaw>();
    const { children } = route;

    const parentRoutePath: string[] = [];
    const getChildRecordRaw = (routeRaw: RouteRecordRaw) => {
        const fullPath = parentRoutePath.length ? `${parentRoutePath.join('')}/${routeRaw.path}` : routeRaw.path;
        childrenRecord.set(fullPath, routeRaw);
        parentRoutePath.push(routeRaw.path);
        if (routeRaw.children) {
            routeRaw.children.forEach((childRouteRaw) => {
                getChildRecordRaw(childRouteRaw);
            });
        }

        parentRoutePath.pop();
    };

    children.forEach((child) => {
        childrenRecord.set(child.path, child);
        getChildRecordRaw(child);
    });

    return childrenRecord;
}

/**
 * 获取树状的路由
 */
function getTreeRoutes() {
    const routes = router.getRoutes();
    const routePathMap = new Map<string, RouteRecordNormalized>();
    routes.forEach((route) => {
        routePathMap.set(route.path, route);
    });
    routes.forEach((route) => {
        const childRouteRaw = getNormalizedRouteRecordChild(route);
        childRouteRaw.forEach((record, childRoutePath) => {
            if (routePathMap.has(childRoutePath)) {
                routePathMap.delete(childRoutePath);
            }
        });
    });
    return Array.from(routePathMap);
}

// #end 树状路由处理 

// #start 获取菜单项
let menuOptions: MenuOption[] = [];
function getMenuOptions() {
    const routes = router.getRoutes().filter((route) => route.meta.super && route.meta.menu);

    const generateMenuOption = (route: RouteRecordRaw): MenuOption => {
        return {
            label: route.meta?.title,
            key: route.name!.toString(),
            children: route.children?.map((item) => generateMenuOption(item)),
        };
    };

    const menus = routes.map((route) => generateMenuOption(route));
    menuOptions = menus;
}
getMenuOptions();
// #end 获取菜单项

// start 菜单处理

const selectMenuKey = ref('');
const onMenuItemClick = (key: string) =>  {
    if (selectMenuKey.value === key) return;
    selectMenuKey.value = key;
    router.push({
        name: key
    });
};
// # end 菜单处理
</script>