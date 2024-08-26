<template>
    <NTooltip trigger="hover" placement="top">
        <template #trigger>
            <NPopover trigger="click" placement="bottom-end">
                <template #trigger>
                    <NIcon size="18">
                        <SettingOutlined />
                    </NIcon>
                </template>
                <template #header>
                    <NSpace>
                        <NButton text type="primary">重置</NButton>

                        <NCheckbox v-model:checked="setting.selection">
                            勾选列
                        </NCheckbox>
                        <NCheckbox v-model:checked="setting.border">
                            表格边框
                        </NCheckbox>
                    </NSpace>
                </template>
                <NCheckboxGroup>
                    <div v-for="item in columns" :key="item.key">
                        <NFlex :wrap="false" align="center">
                            <NIcon size="18" class="drag-icon">
                                <DragOutlined></DragOutlined>
                            </NIcon>
                            <NCheckbox :label="item.title"></NCheckbox>
                            <div class="flex items-center ml-auto">
                                <NTooltip trigger="hover" placement="bottom">
                                    <template #trigger>
                                        <NIcon size="18">
                                            <VerticalRightOutlined />
                                        </NIcon>
                                    </template>
                                    <span>固定到左侧</span>
                                </NTooltip>
                                <NDivider vertical></NDivider>
                                <NTooltip trigger="hover" placement="bottom">
                                    <template #trigger>
                                        <NIcon size="18">
                                            <VerticalLeftOutlined />
                                        </NIcon>
                                    </template>
                                    <span>固定到右侧</span>
                                </NTooltip>
                            </div>

                        </NFlex>

                    </div>
                </NCheckboxGroup>
            </NPopover>
        </template>
        <span>表格设置</span>
    </NTooltip>
</template>
<script setup lang="ts">
import { NTooltip, NPopover, NIcon, NSpace, NSwitch, NButton, NCheckbox, NCheckboxGroup, type DataTableColumns, NFlex, NDivider } from 'naive-ui';
import { DragOutlined, SettingOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@vicons/antd';
import { reactive } from 'vue';
interface IProps {
    columns: DataTableColumns
}
const props = defineProps<IProps>()

const setting = reactive({
    selection: false,
    border: false,
})
</script>

<style lang="scss">
.column-setting {
    &-list {}

}
</style>