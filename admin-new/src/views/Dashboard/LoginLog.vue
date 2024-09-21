<template>
    <NDataTable
        :columns="columns"
        bordered
        :data="tableData"
        key="id"
    ></NDataTable>
</template>
<script setup lang="ts">
import { reqUserRecentLoginLog, type IReqLoginLogResponse } from '@/api/user';
import dayjs from 'dayjs';
import { NDataTable, type DataTableColumns } from 'naive-ui';
import { onMounted, ref } from 'vue';

const columns: DataTableColumns = [
    { key: 'loginAt', title: '登录日期' },
    { key: 'device', title: '登录设备' },
    { key: 'ip', title: '登录地址' }
];

type IDataItem = Omit<IReqLoginLogResponse, 'loginAt'> & {
    loginAt: string;
}

const tableData = ref<IDataItem[]>([]);

onMounted(async () => {
    const res = await reqUserRecentLoginLog();
    tableData.value = res.map((item) => {
        return {
            ...item,
            loginAt: dayjs(item.loginAt).format('YYYY-MM-DD HH:mm:ss')
        };
    });
});
</script>