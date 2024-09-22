<template>
    <div class="flex justify-between mb-2 table-toolbar">
        <div>
            <slot></slot>
        </div>
        <div class="flex items-center">
            <!--斑马纹-->
            <NTooltip trigger="hover">
                <template #trigger>
                    <div class="mr-2 table-toolbar-right-icon">
                        <NSwitch v-model:value="tableSetting.striped" />
                    </div>
                </template>
                <span>表格斑马纹</span>
            </NTooltip>
            <NDivider vertical />
            <!-- 刷新数据 -->
            <NTooltip trigger="hover">
                <template #trigger>
                    <div class="table-toolbar-right-icon">
                        <NIcon size="18" @click="refresh">
                            <ReloadOutlined />
                        </NIcon>
                    </div>
                </template>
                <span>刷新</span>
            </NTooltip>
            <!--密度-->
            <NTooltip trigger="hover">
                <template #trigger>
                    <div class="table-toolbar-right-icon">
                        <NDropdown
                            @select="setDensity"
                            trigger="click"
                            :options="densityOptions"
                            v-model:value="tableSetting.density"
                        >

                            <NIcon size="18">
                                <ColumnHeightOutlined />
                            </NIcon>

                        </NDropdown>
                    </div>
                </template>
                <span>密度</span>
            </NTooltip>

            <!-- 列设置 -->
            <div class="table-toolbar-right-icon">
                <ColumnSetting :table-key="tableKey" :columns="tableColumns">
                </ColumnSetting>
            </div>
        </div>
    </div>
    <div>
        <NDataTable
            :row-key="tableRowKey"
            :columns="innerTableColumns"
            :data="tableData"
            :pagination="pagination"
            :striped="tableSetting.striped"
            :size="tableSetting.density"
            :bordered="tableSetting.border"
            :on-update:page="onPageChange"
            :on-update:page-size="onPageSizeChange"
            :loading="loading"
            :scroll-x="1090"
        >
        </NDataTable>
    </div>
</template>
<script setup lang="ts">
import { NDataTable, NTooltip, NSwitch, NDivider, NIcon, type DataTableColumns, NDropdown, type TableProps, NButton, type DataTableColumn, type DataTableBaseColumn } from 'naive-ui';
import ColumnSetting from './components/ColumnSetting.vue';
import { computed, ref } from 'vue';
import { ColumnHeightOutlined, ReloadOutlined } from '@vicons/antd';
import { useBasicTable } from '@/hooks/basicComponent';
import type { IPageData } from '@/types/api/base';
import { cloneDeep } from 'es-toolkit';
import { useSettingStore } from '@/stores/settingStore';


interface IProps {
    tableColumns: DataTableBaseColumn[];
    pageable: boolean;
    fetchFn: (query: Record<string, any>, ...args: any[]) => Promise<any[] | IPageData<any>>;
    tableKey: string;
}
const props = defineProps<IProps>();


// store 共享数据
const settingStore = useSettingStore();
const { getTableSetting } = settingStore;
const currentTableSetting = getTableSetting(props.tableKey);
const columnSetting = computed(() => currentTableSetting.column);
const tableSetting = currentTableSetting.table;

// 表格列
const innerTableColumns = computed((): DataTableColumns => {
    const clonedColumn = cloneDeep(props.tableColumns);
    if (!columnSetting.value.length) {
        return clonedColumn;
    }

    const newColumns: DataTableColumns = [];
    columnSetting.value.forEach((setting) => {
        if (!setting.show) {
            return;
        }

        const column = clonedColumn.find((col) => col.key === setting.filed);
        if (!column) {
            return;
        }
        newColumns.push(column);

        column.resizable = tableSetting.resizable;
        column.width = setting.width;
        column.fixed = setting.fixed;
    });
    if (tableSetting.selection) {
        newColumns.unshift({
            type: 'selection',
        });
    }
    return newColumns;
});

const tableRowKey = (rowData: any) => rowData.id;

// 数据
const { loading, pagination, handlePaginationChange, refresh, tableData, fetchData, updateRealtime } = useBasicTable(
    props.fetchFn,
    props.pageable,
);

// 表格样式设置
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
const setDensity = (value: TableProps['size']) => {
    tableSetting.density = value;
};

// 分页处理
function onPageChange(page: number) {
    handlePaginationChange(page);
}
function onPageSizeChange(pageSize: number) {
    handlePaginationChange(undefined, pageSize);
}

// expose
defineExpose({
    fetchData,
});
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