<template>
    <NDropdown trigger="hover" :options="options" :on-select="select">
        <NButton icon-placement="right" size="small" class="ml-2">
            <template #icon>
                <n-icon>
                    <DownOutlined />
                </n-icon>
            </template>
            更多
        </NButton>
    </NDropdown>
</template>
<script setup lang="ts">
import { DownOutlined } from '@vicons/antd';
import { NDropdown, NButton, NIcon, type DropdownOption, type DropdownProps } from 'naive-ui';


interface IProps {
    options: DropdownProps['options'];
    onSelect: (key: string, rowData: any) => void;
    rowData: any;
}
const props = defineProps<IProps>();

function select(key: string) {
    props.onSelect(key, props.rowData);
}

</script>