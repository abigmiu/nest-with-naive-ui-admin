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
                    <NDropdown
                        @select="setDensity"
                        trigger="click"
                        :options="densityOptions"
                        v-model:value="density"
                    >
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
                <ColumnSetting :table-key="tableKey" :columns="tableColumns" @update-column="onUpdateColumnSetting">
                </ColumnSetting>
            </div>
        </div>
    </div>
    <div>
        <NDataTable
            :columns="innerTableColumns"
            :data="tableData"
            :pagination="pagination"
            :striped="striped"
            :size="density"
            :bordered="bordered"
            :on-update:page="onPageChange"
            :on-update:page-size="onPageSizeChange"
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
import { useState } from '@/hooks/common';
import { useBasicTable } from '@/hooks/basicComponent';
import type { IPageData } from '@/types/api/base';
import { cloneDeep } from 'es-toolkit';


interface IProps {
    tableColumns: DataTableBaseColumn[];
    pageable: boolean;
    fetchFn: (query: Record<string, any>, ...args: any[]) => Promise<any[] | IPageData<any>>;
    tableKey: string;
}
const props = defineProps<IProps>();
const innerTableColumns = ref<DataTableColumns>([]);

// 数据
const { loading, pagination, handlePaginationChange, refresh, tableData, fetchData, updateRealtime } = useBasicTable(
    props.fetchFn,
    props.pageable,
);

// 表格样式设置
const [striped, setStriped] = useState<boolean>(false);
const bordered = ref(false);

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
const [density, setDensity] = useState<TableProps['size']>('medium');

// 列设置修改
let oldTableSettingInfo: ITableSettingInfo;
function onUpdateColumnSetting(columns: ITableSettingColumn[], info: ITableSettingInfo) {
    console.log('onUpdateColumnSetting');
    const cacheColumns = props.tableColumns;
    const newColumns: DataTableColumns = [];
    const { selection, border, resizable, realtime } = info;
    updateRealtime(realtime);
    bordered.value = border;
    if (selection) {
        newColumns.push({
            type: 'selection',
        });
    }

    columns.forEach((column) => {
        if (!column.check) {
            return;
        }
        const cacheColumn = cacheColumns.find((cacheColumn) => cacheColumn.key === column.key)!;
        const newColumn = clone(cacheColumn);
        newColumn.resizable = resizable;
        newColumns.push(newColumn);
    });

    innerTableColumns.value = newColumns;

    // if (oldTableSettingInfo) {
    //     // 当实时数据切换成非实时数据时，需要将分页设置为第一页
    //     if (
    //         realtime !== oldTableSettingInfo.realtime
    //         && realtime 
    //         && pagination.value 
    //         && pagination.value.page !== 1
    //     ) {
            
    //     }
    // }
    oldTableSettingInfo = cloneDeep(info);
}


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