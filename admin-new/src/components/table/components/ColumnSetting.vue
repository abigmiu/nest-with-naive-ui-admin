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
                    <NButton text type="primary" @click="onReset">重置</NButton>
                    <div class="flex mt-2">
                        <NCheckbox v-model:checked="setting.selection" class="flex-1">勾选列</NCheckbox>
                        <NCheckbox v-model:checked="setting.border" class="flex-1">表格边框</NCheckbox>
                    </div>
                    <div class="flex mt-2">
                        <NCheckbox v-model:checked="setting.resizable" class="flex-1">宽度调整</NCheckbox>
                        <NCheckbox v-model:checked="setting.realtime" class="flex-1">
                            <n-tooltip placement="bottom" trigger="hover">
                                <template #trigger>实时数据</template>
                                <span>勾选后每页数据将查询最新数据，不勾选每页数据根据第一页数据进行查询</span>
                            </n-tooltip>
                        </NCheckbox>
                    </div>
                </template>
                <NCheckboxGroup v-model:value="columnChecked" :on-update:value="handleColumnCheck">
                    <Draggerable
                        v-model="dragList"
                        animation="300"
                        item-key="field"
                        filter=".no-draggable"
                        :move="onDragMove"
                        @end="onDragEnd"
                    >
                        <template #item="{ element }">
                            <div
                                class="column-setting-list-item"
                                :class="{
                                    'no-draggable': element.draggable === false,
                                }"
                            >
                                <NIcon size="18" class="drag-icon mr-2">
                                    <DragOutlined></DragOutlined>
                                </NIcon>
                                <NCheckbox :label="element.title" :value="element.field"></NCheckbox>
                                <div class="flex items-center ml-auto">
                                    <NTooltip trigger="hover" placement="bottom-end">
                                        <template #trigger>
                                            <NIcon
                                                size="18"
                                                @click="setColumnFixed(element.field, 'left')"
                                                :color="element.fixed === 'left' ? primaryColor : ''"
                                            >
                                                <VerticalRightOutlined />
                                            </NIcon>
                                        </template>
                                        <span>{{ element.fixed === 'left' ? '取消' : '' }}固定到左侧</span>
                                    </NTooltip>
                                    <NDivider vertical></NDivider>
                                    <NTooltip trigger="hover" placement="bottom-end">
                                        <template #trigger>
                                            <NIcon
                                                size="18"
                                                @click="setColumnFixed(element.field, 'right')"
                                                :color="element.fixed === 'right' ? primaryColor : ''"
                                            >
                                                <VerticalLeftOutlined />
                                            </NIcon>
                                        </template>
                                        <span>{{ element.fixed === 'right' ? '取消' : '' }}固定到右侧</span>
                                    </NTooltip>
                                </div>
                            </div>
                        </template>
                    </Draggerable>
                </NCheckboxGroup>
            </NPopover>
        </template>
        <span>表格设置</span>
    </NTooltip>
</template>
<script setup lang="ts">
import { NTooltip, NPopover, NIcon, NButton, NCheckbox, NCheckboxGroup, NDivider, type DataTableBaseColumn, type CheckboxGroupProps, useThemeVars } from 'naive-ui';
import { DragOutlined, SettingOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@vicons/antd';
import { computed, ref, toRaw, toRef, unref, watch } from 'vue';
import Draggerable from 'vuedraggable';
import { useSettingStore } from '@/stores/settingStore';
import { cloneDeep } from 'es-toolkit';

// props 定义
interface IProps {
    columns: DataTableBaseColumn[];
    tableKey: string;
}
const props = defineProps<IProps>();

// 设置数据以及数据初始化
const settingStore = useSettingStore();
const { resetTableSetting, getTableSetting } = settingStore;
const currentTableSetting = getTableSetting(props.tableKey);
const setting = currentTableSetting.table;
const columnSetting = computed(() => currentTableSetting.column);
const columnChecked = ref<string[]>([]);

const initColumn = () => {
    if (!columnSetting.value.length) {
        props.columns.forEach((item) => {
            columnSetting.value.push({
                field: item.key as string,
                title: item.title as string,
                show: true,
                fixed: item.fixed,
            });
        });
    }

    columnChecked.value = columnSetting.value.filter((item) => item.show).map((item) => item.field);
};
initColumn();

const dragList = toRef(columnSetting.value);

const onReset = () => {
    resetTableSetting(props.tableKey);
    initColumn();
    dragList.value = cloneDeep(columnSetting.value);
};

// 拖动排序
const onDragMove = (e: any) => {
    if (e.draggedContext.element.draggable === false) {
        return false;
    }
    return true;
};
const onDragEnd = () => {
    currentTableSetting.column = toRaw(unref(dragList));
};

// 设置列是否可见
const handleColumnCheck: CheckboxGroupProps['onUpdate:value'] = (checkedValue, meta) => {
    const { actionType, value } = meta;

    const column = columnSetting.value.find((item) => item.field === value)!;
    column.show = actionType === 'check';
    columnChecked.value = checkedValue as string[];
};

// 设置列的固定
const setColumnFixed = (field: string, fixed: 'left' | 'right') => {
    const column = columnSetting.value.find((item) => item.field === field)!;
    if (column.fixed === fixed) {
        column.fixed = undefined;
        return;
    }
    column.fixed = fixed;

    // const index = columnSetting.value.findIndex((item) => item.field === field)!;
    // if (fixed === 'left') {
    //     columnSetting.value.splice(index, 1);
    //     columnSetting.value.unshift(column);
    // } else if (fixed === 'right') {
    //     columnSetting.value.splice(index, 1);
    //     columnSetting.value.push(column);
    // }
};

const themeVars = useThemeVars();
const primaryColor = computed(() => themeVars.value.primaryColor);
</script>

<style lang="scss">
.column-setting {
    &-list {
        &-item {
            padding: 10px 14px;
            display: flex;
            align-items: center;
            min-width: 220px;

            &:hover {
                background: #e6f7ff;
            }
        }
    }

    .drag-icon {
        cursor: move
    }


}
</style>