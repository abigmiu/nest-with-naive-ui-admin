<template>
    <NLayoutSider
        class="layout-sider"
        :inverted="menuDark"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="asideCollapsed"
    >
        <div class="p-4">
            <NButton size="large" type="primary" block> 
                <template #icon>
                    <NIcon>
                        <PlusCircleOutlined></PlusCircleOutlined>
                    </NIcon>
                </template>
                发布视频
            </NButton>
        </div>

        <NMenu
            ref="menuRef"
            :options="menuOptions"
            :inverted="menuDark"
            :on-update:value="onMenuItemClick"
            :on-update:expanded-keys="onExpandedKeysUpdate"
            :value="selectMenuKey"
            :expanded-keys="expandedKeys"
            :collapsed="asideCollapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
        ></NMenu>
    </NLayoutSider>
</template>

<script lang="ts" setup>

import { useSettingStore } from '@/stores/settingStore';
import { useUserStore } from '@/stores/userStore';
import { layoutMenus, type IMenuMeta } from './menus';
import { NMenu, NIcon, NButton, type MenuOption, NLayoutSider, type MenuProps } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { nextTick, ref, watch } from 'vue';
import { useRoute, useRouter, } from 'vue-router';
import { PlusCircleOutlined } from '@vicons/antd';


const settingStore = useSettingStore();

const { menuDark, asideCollapsed } = storeToRefs(settingStore);

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

const menuOptions = layoutMenus;



// start 菜单处理
const menuRef = ref<InstanceType<typeof NMenu> | null>(null);
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

/** 展开当前菜单的父菜单 */
const expandParentMenu = async () => {
    await nextTick();
    menuRef.value!.showOption(selectMenuKey.value);
};

watch(() => route.name, (routeName) => {
    if (routeName) {
        selectMenuKey.value = routeName as string;
        expandParentMenu();
    }
}, { immediate: true });
</script>