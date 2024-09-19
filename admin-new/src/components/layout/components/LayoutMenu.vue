<template>
    <NLayoutSider
        class="layout-sider"
        :inverted="menuDark"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
    >
        <NMenu
            :options="menuOptions"
            :inverted="menuDark"
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
import { useSettingStore } from '@/stores/settingStore';
import { useUserStore } from '@/stores/userStore';
import { layoutMenus, type IMenuMeta } from '@/utils/menus';
import { NMenu, type MenuOption, NLayoutSider, type MenuProps } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter, type RouteRecordNormalized, type RouteRecordRaw } from 'vue-router';

const menuStore = useMenuStore();
const settingStore = useSettingStore();
const { collapsed } = storeToRefs(menuStore);
const { menuDark } = storeToRefs(settingStore);

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

const menuOptions = layoutMenus;

// start 菜单处理

const selectMenuKey = ref('');
const expandedKeys = ref<string[]>([]);
const onExpandedKeysUpdate = (keys: string[]) => {
    expandedKeys.value = keys;
};
const onMenuItemClick: MenuProps['onUpdate:value'] = async (key: string, option) => {
    const meta = option.meta as IMenuMeta;
    
    if (selectMenuKey.value === key) return;

    const navigateResult = await router.push({
        name: meta.routeName
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