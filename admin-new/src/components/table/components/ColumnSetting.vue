<template>
    <NTooltip
        trigger="hover"
        placement="top"
    >
        <template #trigger>
            <NPopover
                trigger="click"
                placement="bottom-end"
                @update-show="onPopoverShowUpdate"
            >
                <template #trigger>
                    <NIcon size="18">
                        <SettingOutlined />
                    </NIcon>
                </template>
                <template #header>
                    <NSpace>
                        <NButton
                            text
                            type="primary"
                        >重置</NButton>
                        <NCheckbox v-model:checked="setting.selection">
                            勾选列
                        </NCheckbox>
                        <NCheckbox v-model:checked="setting.border">
                            表格边框
                        </NCheckbox>
                        <NCheckbox v-model:checked="setting.resizable">
                            宽度调整
                        </NCheckbox>
                    </NSpace>
                </template>
                <NCheckboxGroup
                    v-model:value="columnChecked"
                    :on-update:value="handleColumnCheck"
                >

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
                                <NIcon
                                    size="18"
                                    class="drag-icon mr-2"
                                >
                                    <DragOutlined></DragOutlined>
                                </NIcon>
                                <NCheckbox
                                    :label="element.title"
                                    :value="element.key"
                                ></NCheckbox>
                                <div class="flex items-center ml-auto">
                                    <NTooltip
                                        trigger="hover"
                                        placement="bottom"
                                    >
                                        <template #trigger>
                                            <NIcon size="18">
                                                <VerticalRightOutlined />
                                            </NIcon>
                                        </template>
                                        <span>固定到左侧</span>
                                    </NTooltip>
                                    <NDivider vertical></NDivider>
                                    <NTooltip
                                        trigger="hover"
                                        placement="bottom"
                                    >
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
interface IProps {
    columns: DataTableBaseColumn[]
}
const props = defineProps<IProps>()

const emits = defineEmits<{
    updateColumn: [columns: ITableSettingColumn[], info: ITableSettingInfo]
}>()

export interface ITableSettingInfo {
    selection: boolean;
    border: boolean;
    resizable: boolean;
}
const setting = reactive<ITableSettingInfo>({
    selection: false,
    border: false,
    resizable: false,
})

export interface ITableSettingColumn {
    title: string;
    key: string;
    isLeftFix: boolean;
    isRightFix: boolean;
    check: boolean;
}
const columnChecked = ref<string[] | null>(null);
const columnsSettingList = ref<ITableSettingColumn[]>([])

function init() {
    console.log('init')
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
        }
        columnsSettingList.value.push(settingItem);
        columnChecked.value!.push(column.key.toString());
    })
    updateSetting();
}
init();

// 拖动排序
function onMove(e) {
    if (e.draggedContext.element.draggable === false) return false;
    return true;
}
function onDragEnd() {
    console.log(unref(columnsSettingList))
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
    emits('updateColumn', newColumns, setting)
}

const handleColumnCheck: CheckboxGroupProps['onUpdate:value'] = (checkedValue, meta) => {
    const { actionType, value } = meta;

    const columnSetting = columnsSettingList.value.find((column) => column.key === value)!;
    columnSetting.check = actionType === 'check'
    columnChecked.value = checkedValue as string[];
}
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