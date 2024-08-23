<template>
    <div class="tabs-card">
        <span class="tabs-card-prev">
            <NIcon size="16" color="#515a6e">
                <LeftOutlined />
            </NIcon>
        </span>
        <div class="flex-1 overflow-hidden" ref="scrollWrapEl">
            <div class="tabs-card-scroll" ref="scrollEl">
                <div class="tabs-card-scroll-item" v-for="item in 10" :key="item">
                    <span>标签明</span>
                    <NIcon size="14">
                        <CloseOutlined />
                    </NIcon>
                </div>
            </div>



        </div>
        <span class="tabs-card-next">
            <NIcon size="16" color="#515a6e">
                <RightOutlined />
            </NIcon>
        </span>
    </div>
</template>
<script setup lang="ts">
import { NIcon } from 'naive-ui';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@vicons/antd';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';


// 滚动处理
const scrollable = ref(false);
const scrollWrapEl = ref<HTMLDivElement | null>(null);
const scrollEl = ref<HTMLDivElement | null>(null);
function judgeScrollable() {
    const { scrollWidth } = scrollEl.value!;
    const { clientWidth } = scrollWrapEl.value!;
    scrollable.value = scrollWidth > clientWidth;
    console.log("🚀 ~ judgeScrollable ~ scrollable.value:", scrollable.value);
}
const debounceJudgeScrollable = useDebounceFn(judgeScrollable, 500);
onMounted(() => {
    window.addEventListener('resize', debounceJudgeScrollable);
})
onUnmounted(() => {
    window.removeEventListener('reset', debounceJudgeScrollable);
})

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
}

.tabs-card-scrollable {
    padding: 0 32px;
    overflow: hidden;
}
</style>