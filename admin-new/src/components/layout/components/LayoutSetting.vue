<template>
    <NDrawer v-model:show="visible" placement="right" width="300">
        <NDrawerContent title="偏好设置" class="drawer">

            <NDivider title-placement="center">导航栏风格</NDivider>

            <div class="drawer-setting-item align-items-top">
                <div class="drawer-setting-item-style align-items-top" @click="setMenuDark(true); setHeaderDark(false)">
                    <NTooltip placement="top">
                        <template #trigger>
                            <img src="~@/assets/images/nav-theme-dark.svg" alt="暗色侧边栏" />
                        </template>
                        <span>暗色侧边栏</span>
                    </NTooltip>
                    <NBadge dot color="#19be6b" v-if="!headerDark && menuDark" />
                </div>

                <div
                    class="drawer-setting-item-style align-items-top"
                    @click="setMenuDark(false); setHeaderDark(false)"
                >
                    <NTooltip placement="top">
                        <template #trigger>
                            <img src="~@/assets/images/nav-theme-light.svg" alt="亮色侧边栏" />
                        </template>
                        <span>亮色侧边栏</span>
                    </NTooltip>
                    <NBadge dot color="#19be6b" v-if="!menuDark && !headerDark" />
                </div>

                <div class="drawer-setting-item-style align-items-top" @click="setHeaderDark(true); setMenuDark(true)">
                    <NTooltip placement="top">
                        <template #trigger>
                            <img src="~@/assets/images/header-theme-dark.svg" alt="暗色顶栏" />
                        </template>
                        <span>暗色顶栏</span>
                    </NTooltip>
                    <NBadge dot color="#19be6b" v-if="headerDark && menuDark" />

                </div>
            </div>

            <NDivider title-placement="center">系统主题</NDivider>
            <div class="drawer-setting-theme align-items-top">

                <div
                    class="drawer-setting-theme-item"
                    v-for="item in THEME_LIST"
                    :key="item.hex"
                    @click="themeColor = item.hex"
                >
                    <div class="theme-item-hex" :style="{ background: item.hex }"></div>
                    <div class="theme-item-name">{{ item.name }}</div>
                    <NBadge dot color="#19be6b" v-if="item.hex === themeColor" />
                </div>

            </div>

            <NDivider title-placement="center">动画</NDivider>
            <div class="drawer-setting-item">
                <div class="drawer-setting-item-title"> 启用动画 </div>
                <div class="drawer-setting-item-action">
                    <NSwitch v-model:value="enableAnimation"></NSwitch>
                </div>
            </div>
            <div class="drawer-setting-item">
                <div class="drawer-setting-item-title"> 动画类型 </div>
                <div class="drawer-setting-item-select">
                    <NSelect v-model:value="animationName" :options="ANIMATIONS"></NSelect>
                </div>
            </div>

        </NDrawerContent>
    </NDrawer>
</template>
<script setup lang="ts">
import { useSettingStore } from '@/stores/settingStore';
import { NDrawer, NDrawerContent, NDivider, NTooltip, NBadge, NSwitch, NSelect } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { THEME_LIST, ANIMATIONS } from '@/utils/constant';

const settingStore = useSettingStore();
const { visible, menuDark, headerDark, themeColor, enableAnimation, animationName } = storeToRefs(settingStore);
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

    &-setting-theme {
        display: grid;
        column-gap: 10px;
        row-gap: 10px;
        grid-template-columns: repeat(4, 1fr);

        &-item {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .theme-item-hex {
                height: 30px;
                width: 30px;
                border-radius: 4px
            }
        }

    }
}
</style>