<template>
    <NDrawer v-model:show="visible" placement="right" width="300">
        <NDrawerContent title="偏好设置" class="drawer">

            <NDivider title-placement="center">导航栏风格</NDivider>

            <div class="drawer-setting-item align-items-top">
                <div class="drawer-setting-item-style align-items-top" @click="setMenuDark(true);setHeaderDark(false)">
                    <NTooltip placement="top">
                        <template #trigger>
                            <img src="~@/assets/images/nav-theme-dark.svg" alt="暗色侧边栏" />
                        </template>
                        <span>暗色侧边栏</span>
                    </NTooltip>
                    <NBadge dot color="#19be6b" v-if="!headerDark && menuDark" />
                </div>

                <div class="drawer-setting-item-style align-items-top" @click="setMenuDark(false);setHeaderDark(false)">
                    <NTooltip placement="top">
                        <template #trigger>
                            <img src="~@/assets/images/nav-theme-light.svg" alt="亮色侧边栏" />
                        </template>
                        <span>亮色侧边栏</span>
                    </NTooltip>
                    <NBadge dot color="#19be6b" v-if="!menuDark && !headerDark" />
                </div>

                <div class="drawer-setting-item-style align-items-top" @click="setHeaderDark(true);setMenuDark(true)" >
                    <NTooltip placement="top">
                        <template #trigger>
                            <img src="~@/assets/images/header-theme-dark.svg" alt="暗色顶栏" />
                        </template>
                        <span>暗色顶栏</span>
                    </NTooltip>
                    <NBadge dot color="#19be6b" v-if="headerDark && menuDark" />

                </div>
            </div>
        </NDrawerContent>
    </NDrawer>
</template>
<script setup lang="ts">
import { useSettingStore } from '@/stores/settingStore';
import { NDrawer, NDrawerContent, NDivider, NTooltip, NBadge } from 'naive-ui';
import { storeToRefs } from 'pinia';

const settingStore = useSettingStore();
const { visible, menuDark, headerDark } = storeToRefs(settingStore);
const { setMenuDark, setHeaderDark } = settingStore;
</script>

<style lang="scss" scoped>
.drawer {
    .n-divider:not(.n-divider--vertical) {
        margin: 10px 0;
    }

    &-setting-item {
        display: flex;
        align-items: center;
        padding: 12px 0;
        flex-wrap: wrap;
        justify-content: space-between;

        &-style {
            display: inline-block;
            position: relative;
            margin-right: 16px;
            cursor: pointer;
            text-align: center;
        }

        &-title {
            flex: 1 1;
            font-size: 14px;
        }

        &-action {
            flex: 0 0 auto;
        }

        &-select {
            flex: 1;
        }

        .theme-item {
            width: 20px;
            min-width: 20px;
            height: 20px;
            cursor: pointer;
            border: 1px solid #eee;
            border-radius: 2px;
            margin: 0 5px 5px 0;
            text-align: center;
            line-height: 14px;

            .n-icon {
                color: #fff;
            }
        }
    }

    .align-items-top {
        align-items: flex-start;
        padding: 2px 0;
    }

    .justify-center {
        justify-content: center;
    }

    .dark-switch .n-switch {
        ::v-deep(.n-switch__rail) {
            background-color: #000e1c;
        }
    }
}
</style>