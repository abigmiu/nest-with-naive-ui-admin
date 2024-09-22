<template>

    <NLayoutHeader>
        <div class="tabs-card">
            <span class="tabs-card-prev" v-show="scrollable">
                <NIcon size="16" color="#515a6e">
                    <LeftOutlined />
                </NIcon>
            </span>
            <div class="flex-1 overflow-hidden" ref="scrollWrapEl">
                <div class="tabs-card-scroll" ref="scrollEl">
                    <div
                        class="tabs-card-scroll-item"
                        v-for="item in tabs"
                        :key="item.name"
                        @contextmenu="(e) => onTabsMenuShow(e, item)"
                        :class="{ 'active-item': activeRouteName === item.name }"
                        @click="onJumpRoute(item)"
                    >
                        <span>{{ item.title }}</span>
                        <NIcon size="14" @click.stop="closeTab(item)" v-if="item.closeAble">
                            <CloseOutlined />
                        </NIcon>
                    </div>
                </div>
            </div>
            <span class="tabs-card-next" v-show="scrollable">
                <NIcon size="16" color="#515a6e">
                    <RightOutlined />
                </NIcon>
            </span>
        </div>
        <NDropdown
            :options="tabsMenuOptions"
            :x="tabsMenuX"
            :y="tabsMenuY"
            :show="tabsMenusShow"
            :on-clickoutside="onTabsMenuClickOutside"
            @select="onTabsMenuSelect"
            placement="bottom-start"
            trigger="manual"
        >
        </NDropdown>
    </NLayoutHeader>



</template>
<script setup lang="ts">
import { NIcon, useThemeVars, type DropdownNodeProps, type DropdownOption, type DropdownProps, NDropdown, NLayoutHeader } from 'naive-ui';
import { CloseOutlined, ColumnWidthOutlined, LeftOutlined, MinusOutlined, RightOutlined } from '@vicons/antd';
import { computed, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { useAliveStore } from '@/stores/aliveStore';
import { message } from '@/utils/global';
import { renderIcon } from '@/router/util';
import { ReloadOutline } from '@vicons/ionicons5';



const themeVars = useThemeVars();
const primaryColor = computed(() => themeVars.value.primaryColor);

interface ITab {
    name: string;
    title: string;
    closeAble: boolean;
}

const aliveStore = useAliveStore();
const { setKeepCmp } = aliveStore;

const tabs = ref<Array<ITab>>([]);
const activeRouteName = ref('');

// 滚动处理
const scrollable = ref(false);
const scrollWrapEl = ref<HTMLDivElement | null>(null);
const scrollEl = ref<HTMLDivElement | null>(null);
/**
 * 判断是否应当滚动
 */
async function judgeScrollable() {
    if (!scrollEl.value) return;
    await nextTick();
    const { scrollWidth } = scrollEl.value!;
    const { clientWidth } = scrollWrapEl.value!;
    scrollable.value = scrollWidth > clientWidth;
}
const debounceJudgeScrollable = useDebounceFn(judgeScrollable, 500);
onMounted(() => {
    window.addEventListener('resize', debounceJudgeScrollable);
});
onUnmounted(() => {
    window.removeEventListener('resize', debounceJudgeScrollable);
});



// 路由监听修改标签页
const router = useRouter();
const route = useRoute();
function handleRouteChange() {
    activeRouteName.value = route.name as string;
    const isExit = tabs.value.some((tab) => tab.name === route.name);
    if (isExit) {
        return;
    }


    tabs.value.push({
        name: route.name as string,
        title: route.meta.title,
        closeAble: !route.meta.tabDisallowClose
    });
    judgeScrollable();
}
watch(() => route.fullPath, handleRouteChange, { immediate: true });

// 标签页事件处理
function closeTab(item: ITab, jumpRoute = true) {
    if (tabs.value.length === 1) {
        return message.warning('这已经是最后一页，不能再关闭了！');
    }
    const index = tabs.value.findIndex((tab) => tab.name === item.name);
    if (index === -1) return;
    setKeepCmp(tabs.value[index].name, false);
    tabs.value.splice(index, 1);
    if (jumpRoute) {
        jumpLastTab();
    }

}

const jumpLastTab = () => {
    // 获取上一个路由
    const lastRoute = tabs.value[tabs.value.length - 1] || tabs.value[0];
    if (!lastRoute) return;
    router.push({
        name: lastRoute.name
    });
};

function onJumpRoute(item: ITab) {
    if (activeRouteName.value === item.name) return;
    router.push({
        name: item.name
    });
}


// 标签右键

const tabsMenusShow = ref(false);
const tabsMenuX = ref(0);
const tabsMenuY = ref(0);
let currentCloseTab: ITab;
function onTabsMenuShow(e: MouseEvent, tab: ITab) {
    e.preventDefault();
    currentCloseTab = tab;
    tabsMenusShow.value = true;
    tabsMenuX.value = e.clientX;
    tabsMenuY.value = e.clientY;
}
function onTabsMenuClickOutside() {
    tabsMenusShow.value = false;
}

const refreshCurrent = () => {
    setKeepCmp(currentCloseTab.name, false);
    router.replace({
        name: currentCloseTab.name,
        query: {
            refreshCurrentPage: Math.random().toString(),
        }
    });
};
const closeCurrent = () => {
    closeTab(currentCloseTab, true);
};
const closeOther = () => {
    const closeableTabs = tabs.value.filter((item) => item.closeAble);
    closeableTabs.forEach((item) => {
        if (item.name !== currentCloseTab.name) {
            closeTab(item, false);
        }
    });
    jumpLastTab();
};
const closeAll = () => {
    const closeableTabs = tabs.value.filter((item) => item.closeAble);
    closeableTabs.forEach((item) => {
        closeTab(item, false);
    });
    jumpLastTab();
};

const onTabsMenuSelect: DropdownProps['onSelect'] = (key, option) => {
    const actionDict: Record<string, () => void> = {
        1: refreshCurrent,
        2: closeCurrent,
        3: closeOther,
        4: closeAll,
    };
    const action = actionDict[key];
    if (action) {
        tabsMenusShow.value = false;
        action();
    }
};

const tabsMenuOptions = computed((): DropdownProps['options'] => {
    const isDisable = tabs.value.length === 1;
    return [
        {
            label: '刷新当前',
            key: '1',
            icon: renderIcon(ReloadOutline)
        },
        {
            label: '关闭当前',
            key: '2',
            disabled: isDisable,
            icon: renderIcon(CloseOutlined)
        },
        {
            label: '关闭其他',
            key: '3',
            disabled: isDisable,
            icon: renderIcon(ColumnWidthOutlined)
        },
        {
            label: '关闭全部',
            key: '4',
            disabled: isDisable,
            icon: renderIcon(MinusOutlined)
        }
    ];
});

</script>
<style lang="scss">
.tabs-card {
    padding: 6px 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tabs-card-prev,
    .tabs-card-next {
        width: 32px;
        text-align: center;
        line-height: 32px;
        cursor: pointer;

        .n-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            width: 32px;
        }
    }


    .tabs-card-next-hide,
    .tabs-card-prev-hide {
        display: none;
    }

    &-scroll {
        white-space: nowrap;
        display: flex;

        &-item {
            background: #fff;
            color: rgb(31, 34, 37);
            height: 32px;
            padding: 6px 16px 4px;
            border-radius: 3px;
            margin-right: 6px;
            cursor: pointer;
            display: inline-block;
            position: relative;
            flex: 0 0 auto;

            span {
                float: left;
                vertical-align: middle;
            }

            &:hover {
                color: #515a6e;
            }

            .n-icon {
                height: 22px;
                width: 21px;
                margin-right: -6px;
                position: relative;
                vertical-align: middle;
                text-align: center;
                color: #808695;

                &:hover {
                    color: #515a6e !important;
                }

                svg {
                    height: 21px;
                    display: inline-block;
                }
            }
        }
    }

    .active-item {
        color: v-bind(primaryColor);

    }
}

.tabs-card-scrollable {
    padding: 0 32px;
    overflow: hidden;
}
</style>