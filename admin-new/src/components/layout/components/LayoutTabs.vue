<template>
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
                    @contextmenu="onItemContextMenu"
                    :class="{ 'active-item': activeRouteName === item.name }"
                    @click="onJumpRoute(item)"
                >
                    <span>{{ item.title }}</span>
                    <NIcon size="14" @click.stop="closeTab(item)" v-if="item.closeAble" >
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
</template>
<script setup lang="ts">
import { NIcon, useThemeVars } from 'naive-ui';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@vicons/antd';
import { computed, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { useAliveStore } from '@/stores/aliveStore';

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


// 标签页右键
function onItemContextMenu(e: MouseEvent) {
    e.preventDefault();
}

// 路由监听修改标签页
const router = useRouter();
const route = useRoute();
function handleRouteChange() {
    console.log(route.meta);
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
function closeTab(item: ITab) {
    const index = tabs.value.findIndex((tab) => tab.name === item.name);
    if (index === -1) return;
    setKeepCmp(tabs.value[index].name, false);
    tabs.value.splice(index, 1);
    // 获取上一个路由
    const lastRoute = tabs.value[tabs.value.length - 1] || tabs.value[0];
    if (!lastRoute) return;
    router.push({
        name: lastRoute.name
    });
}
function onJumpRoute(item: ITab) {
    if (activeRouteName.value === item.name) return;
    router.push({
        name: item.name
    });
}

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