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
                <ColumnSetting :columns="tableColumns"/>
            </div>
        </div>

    </div>
    <div>
        <NDataTable :columns="tableColumns" :data="tableData" :pagination="pagination" :striped="striped" :size="tableDensity"></NDataTable>
    </div>
</template>
<script setup lang="ts">
import { NDataTable, NTooltip, NSwitch, NDivider, NIcon, type DataTableColumns, type PaginationProps, NDropdown, type TableProps, NButton } from 'naive-ui';
import ColumnSetting from './components/ColumnSetting.vue';
import { ref } from 'vue';
import { ColumnHeightOutlined, ReloadOutlined } from '@vicons/antd';



interface IProps {
    tableColumns: DataTableColumns
}
const props = defineProps<IProps>()

const tableData = ref([]);
const pagination = ref<PaginationProps | false>(false);


// 表格斑马纹
const striped = ref(false);
function setStriped(value: boolean) {
    striped.value = value;
}
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