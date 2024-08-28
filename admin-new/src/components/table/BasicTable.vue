<template>
    <div class="flex justify-between mb-2 table-toolbar">
        <div></div>
        <div class="flex items-center">
            <!--斑马纹-->
            <NTooltip trigger="hover">
                <template #trigger>
                    <div class="mr-2 table-toolbar-right-icon">
                        <NSwitch v-model:value="striped" @update:value="setStriped" />
                    </div>
                </template>
                <span>表格斑马纹</span>
            </NTooltip>
            <NDivider vertical />
            <!-- 刷新数据 -->

            <NTooltip trigger="hover">
                <template #trigger>
                    <div class="table-toolbar-right-icon">
                        <NIcon size="18">
                            <ReloadOutlined />
                        </NIcon>
                    </div>
                </template>
                <span>刷新</span>
            </NTooltip>

            <!--密度-->
            <NTooltip trigger="hover">
                <template #trigger>
                    <NDropdown @select="onDensitySelect" trigger="click" :options="densityOptions"
                        v-model:value="tableDensity">
                        <div class="table-toolbar-right-icon">
                            <NIcon size="18">
                                <ColumnHeightOutlined />
                            </NIcon>
                        </div>
                    </NDropdown>
                </template>
                <span>密度</span>
            </NTooltip>


            <!-- 列设置 -->
            <div class="table-toolbar-right-icon">
                <ColumnSetting :columns="tableColumns" @update-column="onUpdateColumnSetting"></ColumnSetting>
            </div>
        </div>
    </div>
    <div>
        <NDataTable :columns="innerTableColumns" :data="tableData" :pagination="pagination" :striped="striped"
            :size="tableDensity" :bordered="bordered"
            :on-page-change="onPageChange"
            :on-page-size-change="onPageSizeChange"
            :loading="loading"
            ></NDataTable>
    </div>
</template>
<script setup lang="ts">
import { NDataTable, NTooltip, NSwitch, NDivider, NIcon, type DataTableColumns, type PaginationProps, NDropdown, type TableProps, NButton, type DataTableColumn, type DataTableBaseColumn } from 'naive-ui';
import ColumnSetting, { type ITableSettingColumn, type ITableSettingInfo } from './components/ColumnSetting.vue';
import { ref } from 'vue';
import { ColumnHeightOutlined, ReloadOutlined } from '@vicons/antd';
import { clone } from 'radash';


interface IProps {
    tableColumns: DataTableBaseColumn[];
    tableData: any[];
    pagination: PaginationProps | false;
    loading: boolean;
}
const props = defineProps<IProps>()

const emits = defineEmits<{
    paginationChange: [data: { page?: number, pageSize?: number }]
}>()

const innerTableColumns = ref<DataTableColumns>([])

// 表格样式设置
const striped = ref(false);
function setStriped(value: boolean) {
    striped.value = value;
}

const bordered = ref(false);

// 密度
const tableDensity = ref<TableProps['size']>('medium');
const densityOptions = [
    {
        type: 'menu',
        label: '紧凑',
        key: 'small',
    },
    {
        type: 'menu',
        label: '默认',
        key: 'medium',
    },
    {
        type: 'menu',
        label: '宽松',
        key: 'large',
    },
];
function onDensitySelect(value: TableProps['size']) {
    tableDensity.value = value;
}

// 列设置修改
function onUpdateColumnSetting(columns: ITableSettingColumn[], info: ITableSettingInfo) {
    const cacheColumns = props.tableColumns;
    const newColumns: DataTableColumns = [];
    const { selection, border, resizable } = info;
    bordered.value = border;
    if (selection) {
        newColumns.push({
            type: 'selection',
        })
    }

    columns.forEach((column) => {
        if (!column.check) {
            return;
        }
        const cacheColumn = cacheColumns.find((cacheColumn) => cacheColumn.key === column.key)!;
        const newColumn = clone(cacheColumn);
        newColumn.resizable = resizable;
        newColumns.push(newColumn);
    })

    innerTableColumns.value = newColumns;
}


function onPageChange(page: number) {
   emits('paginationChange', {page})
}
function onPageSizeChange(pageSize: number) {
    emits('paginationChange', {pageSize})
}

// expose
</script>

<style lang="scss">
.table-toolbar {
    &-right-icon {
        margin-left: 12px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
}
</style>