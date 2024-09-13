<template>
    <div id="quill-fake-toolbar">
        <NTooltip>
            <template #trigger>
                <span class="relative ql-toolbar-fake-btn">
                    <NIcon @click="onBold" class="tooltip-icon">
                        <BoldOutlined />
                    </NIcon>
                    <button class="ql-bold"></button>
                </span>
            </template>
            加粗
        </NTooltip>
    </div>
</template>
<script setup lang="ts">
import { NIcon, NTooltip } from 'naive-ui';
import { BoldOutlined, SearchOutlined } from '@vicons/antd';
import type Quill from 'quill';

interface IProps {
    quill: Quill
}

const props = defineProps<IProps>();


const onBold = () => {
    props.quill.format('bold', true);
};


</script>

<style lang="scss">
.ql-toolbar-fake-btn {
    &:has(.ql-active) {
        color: red;
    }
    > button[class^="ql-"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 1;
    }
}
</style>