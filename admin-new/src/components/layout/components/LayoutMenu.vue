<template>
    <NLayoutSider
        class="layout-sider"
        :inverted="true"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
    >
        <NMenu
            :options="menuOptions"
            :inverted="true"
            :on-update:value="onMenuItemClick"
            :on-update:expanded-keys="onExpandedKeysUpdate"
            :value="selectMenuKey"
            :expanded-keys="expandedKeys"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
        ></NMenu>
    </NLayoutSider>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/stores/menuStore';
import { useUserStore } from '@/stores/userStore';
import { NMenu, type MenuOption, NLayoutSider } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter, type RouteRecordNormalized, type RouteRecordRaw } from 'vue-router';

const menuStore = useMenuStore();
const { collapsed } = storeToRefs(menuStore);

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

// #start 树状路由处理
function getNormalizedRouteRecordChild(route: RouteRecordNormalized) {
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
    const routes = router.getRoutes()
        .filter((route) => route.meta.super && route.meta.menu);

    const generateMenuOption = (route: RouteRecordRaw): MenuOption => {
        const children = route.children?.map((item) => generateMenuOption(item));
        let hasPermission = true;
        if (route.meta?.permission) {
            hasPermission = userStore.hasMenuPermissions(route.meta.permission);
        }


        return {
            label: route.meta?.title,
            key: route.name!.toString(),
            icon: route.meta?.icon,
            children,
            show: Array.isArray(children) ? children.some((item) => item.show) : hasPermission,
        };
    };

    const menus = routes.map((route) => generateMenuOption(route));
    menuOptions = menus;
}
getMenuOptions();
// #end 获取菜单项

// start 菜单处理

const selectMenuKey = ref('');
const expandedKeys = ref<string[]>([]);
const onExpandedKeysUpdate = (keys: string[]) => {
    console.log("🚀 ~ onExpandedKeysUpdate ~ keys:", keys);
    expandedKeys.value = keys;
};
const onMenuItemClick = async (key: string) => {
    if (selectMenuKey.value === key) return;

    const navigateResult = await router.push({
        name: key
    });
    if (!navigateResult) {
        selectMenuKey.value = key;
    }
};
// # end 菜单处理

const expandParentMenu = () => {
    let chainMenuKeys: string[] = [];

    function recursion(options: MenuOption[]): boolean {
        for (const option of options) {
            chainMenuKeys.push(option.key as string);
            if (option.key === selectMenuKey.value) {
                chainMenuKeys.pop();
                return true;
            }
            if (option.children) {
                if (recursion(option.children)) {
                    return true;
                }
            }
            chainMenuKeys.pop();
        }
        return false;
    }


    recursion(menuOptions);
    chainMenuKeys.forEach((item) => {
        const index = expandedKeys.value.indexOf(item);
        if (index === -1) {
            expandedKeys.value.push(item);
        }
    });
};

watch(() => route.name, (routeName) => {
    if (routeName) {
        selectMenuKey.value = routeName as string;
        expandParentMenu();
    }
});
</script>