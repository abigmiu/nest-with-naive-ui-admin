<template>
    <NTooltip trigger="hover" placement="top">
        <template #trigger>
            <NPopover trigger="click" placement="bottom-end" @update-show="onPopoverShowUpdate">
                <template #trigger>
                    <NIcon size="18">
                        <SettingOutlined />
                    </NIcon>
                </template>
                <template #header>

                    <NButton text type="primary" @click="onReset">重置</NButton>
                    <div class="flex mt-2">
                        <NCheckbox v-model:checked="setting.selection" class="flex-1">
                            勾选列
                        </NCheckbox>
                        <NCheckbox v-model:checked="setting.border" class="flex-1">
                            表格边框
                        </NCheckbox>
                    </div>
                    <div class="flex mt-2">
                        <NCheckbox v-model:checked="setting.resizable" class="flex-1">
                            宽度调整
                        </NCheckbox>
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
                        v-model="columnsSettingList"
                        animation="300"
                        item-key="key"
                        filter=".no-draggable"
                        :move="onMove"
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
                                <NCheckbox :label="element.title" :value="element.key"></NCheckbox>
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
import { NTooltip, NPopover, NIcon, NSpace, NSwitch, NButton, NCheckbox, NCheckboxGroup, type DataTableColumns, NFlex, NDivider, type DataTableBaseColumn, type CheckboxGroupProps } from 'naive-ui';
import { DragOutlined, SettingOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@vicons/antd';
import { reactive, ref, toRaw, unref, watch } from 'vue';
import Draggerable from 'vuedraggable';
import { useSettingStore } from '@/stores/settingStore';
import { storeToRefs } from 'pinia';
import type { ISettingTableColumn } from '@/types/setting';
import { clone } from 'radash';
interface IProps {
    columns: DataTableBaseColumn[];
    tableKey: string;
}
const props = defineProps<IProps>();

const emits = defineEmits<{
    updateColumn: [columns: ITableSettingColumn[], info: ITableSettingInfo]
}>();

const settingStore = useSettingStore();
const { tableSetting } = storeToRefs(settingStore);
if (!tableSetting.value[props.tableKey]) {
    tableSetting.value[props.tableKey] = JSON.parse(JSON.stringify(tableSetting.value.default));
}

export interface ITableSettingInfo {
    selection: boolean;
    border: boolean;
    resizable: boolean;
    realtime: boolean;
}
const setting = tableSetting.value[props.tableKey].column;

export interface ITableSettingColumn {
    title: string;
    key: string;
    isLeftFix: boolean;
    isRightFix: boolean;
    check: boolean;
}
const columnChecked = ref<string[] | null>(null);
const columnsSettingList = ref<ITableSettingColumn[]>([]);

function init() {
    if (!columnChecked.value) {
        columnChecked.value = [];
    }
    props.columns.forEach((column) => {
        const settingItem: ITableSettingColumn = {
            title: column.title as string,
            key: column.key.toString(),
            isLeftFix: false,
            isRightFix: false,
            check: true,
        };
        columnsSettingList.value.push(settingItem);
        columnChecked.value!.push(column.key.toString());
    });
    updateSetting();
}
init();

// 拖动排序
function onMove(e) {
    if (e.draggedContext.element.draggable === false) return false;
    return true;
}
function onDragEnd() {
    const newColumns = toRaw(unref(columnsSettingList));
    emits('updateColumn', newColumns, setting);
}

function onPopoverShowUpdate(visible: boolean) {
    if (!visible) {
        updateSetting();
    }
}

function updateSetting() {
    const newColumns = toRaw(unref(columnsSettingList));
    emits('updateColumn', newColumns, setting);
}

const handleColumnCheck: CheckboxGroupProps['onUpdate:value'] = (checkedValue, meta) => {
    const { actionType, value } = meta;

    const columnSetting = columnsSettingList.value.find((column) => column.key === value)!;
    columnSetting.check = actionType === 'check';
    columnChecked.value = checkedValue as string[];
};

// 重置设置

const onReset = () => {
    Object.assign(setting, tableSetting.value.default.column);
};
</script>

<style lang="scss">
.column-setting {
    &-list {
        &-item {
            padding: 10px 14px;
            display: flex;
            align-items: center;

            &:hover {
                background: #e6f7ff;
            }
        }
    }

}
</style>