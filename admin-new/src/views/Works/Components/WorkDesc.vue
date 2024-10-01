<template>
    <div>作品描述</div>
    <div class="desc-wrapper">
        <div>
            <NInput
                show-count
                maxlength="30"
                :bordered="false"
                class="desc-bg"
                v-model:value="title"
            ></NInput>
        </div>
        <NDivider></NDivider>
        <div>
            <NPopover
                width="trigger"
                trigger="manual"
                :show="descPopoverVisible"
                :show-arrow="false"
                @clickoutside="clickDescPopoverOutside"
                placement="bottom"
            >
                <template #trigger>
                    <NInput
                        class="desc-bg"
                        :bordered="false"
                        type="textarea"
                        show-count
                        maxlength="1000"
                        @input="onDescInput"
                        ref="descRef"
                        v-model:value="descValue"
                    ></NInput>
                    <!-- <Editor
                        class="desc-bg"
                        style="height: 500px; overflow-y: hidden;"
                        v-model="valueHtml"
                    /> -->
                </template>
                <MentionList v-if="descAction === 'at'"></MentionList>
            </NPopover>
        </div>

        <RecommendTopic @select="onTopicSelect"></RecommendTopic>
    </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import { useState } from '@/hooks/common';
import { NDivider, NInput, NPopover, NTag, type InputProps, type PopoverProps } from 'naive-ui';
import { computed, nextTick, onMounted, ref, shallowRef } from 'vue';
import MentionList from './MentionList.vue';
import RecommendTopic from './RecommendTopic.vue';
import { useWorkStore } from '@/stores/workStore';
import { storeToRefs } from 'pinia';

const workStore = useWorkStore();
const { title, desc: descValue } = storeToRefs(workStore);

// import { Editor } from '@wangeditor/editor-for-vue';
// import type { IEditorConfig } from '@wangeditor/editor';



// const editorRef = shallowRef();
// const valueHtml = ref('<p>hello</p>');
// const editorConfig: Partial<IEditorConfig> = {
//     placeholder: '添加作品简介'
// };



const atChar = '@';
const topicChar = '#';
let descAction: 'at' | 'topic' | null = null;
let descSearchKey = '';
const descRef = ref<InstanceType<typeof NInput> | null>(null);
const [descPopoverVisible, setDescPopoverVisible] = useState(false);
const onDescInput: InputProps['onInput'] = (value: string) => {
    const lastChar = value[value.length - 1];
    if (lastChar === atChar) {
        descAction = 'at';
        setDescPopoverVisible(true);
    } else if (lastChar === topicChar) {
        descAction = 'topic';
        setDescPopoverVisible(true);
    } else if (lastChar === ' ' || lastChar === '\n') {
        descAction = null;
        setDescPopoverVisible(false);
    } else {
        if (descAction) {
            const splitKey = descAction === 'at' ? atChar : topicChar;
            const matches = value.split(splitKey);
            const lastMatch = matches[matches.length - 1];
            descSearchKey = lastMatch;
        }
    }
};
const clickDescPopoverOutside: PopoverProps['onClickoutside'] = (e) => {
    if (!descRef.value!.$el.contains(e.target)) {
        setDescPopoverVisible(false);
    }
};

const onTopicSelect = (value: string) => {
    descValue.value += `#${value}`;
};
</script>

<style lang="scss" scoped>
.desc-bg {
    background-color: #f0f0f2;
}
.desc-wrapper {
    background-color: #f0f0f2;
    border-radius: 4px;
    padding: 8px 12px 12px;
}
</style>