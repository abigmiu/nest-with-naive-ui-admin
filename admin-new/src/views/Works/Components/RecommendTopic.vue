<template>
    <NPopover
        width="trigger"
        trigger="manual"
        :show="popoverVisible"
        placement="bottom-end"
        @clickoutside="setPopoverVisible(false)"
    >
        <template #trigger>
            <div class="recommend-topic">
                <span class="flex-shrink-0 title">推荐</span>
                <div class="flex-1 w-0" ref="topicListWrapperRef">
                    <div class="topic-list" ref="topListRef">
                        <NTag
                            round
                            size="small"
                            @click="onSelect(item)"
                            v-for="item in renderRecommendTopic"
                            :key="item"
                            class="recommend-topic-item"
                        >#{{ item }}
                        </NTag>
                    </div>
                </div>
                <NTag
                    round
                    size="small"
                    class="flex-shrink-0 rest-topic"
                    @click="setPopoverVisible(true)"
                >+{{ restTopics.length }}</NTag>
            </div>
            
        </template>
        <div class="flex gap-y-2 flex-wrap">
            <NTag
                class="mr-4"
                round
                size="small"
                v-for="item in restTopics"
                :key="item"
                @click="onSelect(item)"
            >#{{ item }}
            </NTag>
        </div>
            
    </NPopover>

</template>
<script setup lang="ts">
import { useState } from '@/hooks/common';
import { NPopover, NTag, } from 'naive-ui';
import { computed, nextTick, onMounted, ref } from 'vue';

const emits = defineEmits<{
    select: [value: string]
}>();

const topListRef = ref<HTMLDivElement | null>(null);
const topicListWrapperRef = ref<HTMLDivElement | null>(null);
const recommendTopic = [
    '程序代码', '上课日常', '3d建模', '百度输入法',
    '软件分享', '当代大学', 'ai', '游戏',
    '人工支农', '软件', '教程', '玫瑰花代码'
];
const restTopics = computed(() => recommendTopic.slice(selectTopicIndex.value));
let selectTopicIndex = ref(0);
const renderRecommendTopic = ref<string[]>([]);
const calcShouldRenderTopics = async () => {
    renderRecommendTopic.value.push(recommendTopic[selectTopicIndex.value]);
    await nextTick();
    const { width: listWidth } = topListRef.value!.getBoundingClientRect();
    const { width: wrapperWidth } = topicListWrapperRef.value!.getBoundingClientRect();
    if (listWidth <= wrapperWidth && selectTopicIndex.value < 10) {
        selectTopicIndex.value += 1;
        calcShouldRenderTopics();
    } else {
        renderRecommendTopic.value.pop();
    }
};
onMounted(calcShouldRenderTopics);


const [popoverVisible, setPopoverVisible] = useState(false);

const onSelect = (value: string) => {
    emits('select', value);
    setPopoverVisible(false);
};
</script>
<style lang="scss" scoped>
.recommend-topic {
    display: flex;
    padding-top: 12px;
    align-items: center;
}
.title {
    color: rgba(37, 38, 50, .6);
    font-size: 12px;
    line-height: 18px;
    white-space: nowrap;
    width: 28px;
}
.topic-list {
    width: fit-content;
    white-space: nowrap;
}

.rest-topic {}

.recommend-topic-item {
    margin-right: 8px;
    cursor: pointer;

    &:last-child {
        margin-right: 0;
    }
}
</style>