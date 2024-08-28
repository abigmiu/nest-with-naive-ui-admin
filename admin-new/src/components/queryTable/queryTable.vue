<template>
    <NCard>
        <BasicForm :col="4" :rules="formRules" :schemas="formSchemas" ref="basicFormRef"></BasicForm>
        <div class="flex justify-end mb-4">
            <NButton class="mr-2" type="primary" @click="onQuery">查询</NButton>
            <NButton @click="onReset">重置</NButton>
        </div>
        <BasicTable :table-columns="tableColumns" :table-data="tableData" :pagination="pagination"
            @pagination-change="onPaginationPage" :loading="loading"></BasicTable>
    </NCard>
</template>
<script setup lang="ts">
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { NButton, NCard, type DataTableBaseColumn, type DataTableColumns, type FormRules, type PaginationProps } from 'naive-ui';
import { clone } from 'radash';
import { onMounted, ref } from 'vue';
import BasicTable from '../table/BasicTable.vue';
import type { IPageData } from '@/types/api/base';

export type IFetchFn = (...args: any[]) => Promise<any[] | IPageData>;

interface IProps {
    formRules: FormRules;
    formSchemas: IBasicFormSchemas[];
    tableColumns: DataTableBaseColumn[];
    isPagination: boolean;
    fetchFn: IFetchFn;
}
const props = defineProps<IProps>()

const basicFormRef = ref<null | InstanceType<typeof BasicForm>>(null);

const tableData = ref<any[]>([]);
const pagination = ref<PaginationProps | false>(props.isPagination ? { page: 1, pageSize: 20 } : false);
let cachePaginationQuery: { page?: number, pageSize?: number } = {}
const loading = ref(false);
async function onQuery() {
    const formEl = basicFormRef.value!;
    await formEl.validateForm();
    const queryData = clone(formEl.formData);

    if (props.isPagination) {
        queryData.page = cachePaginationQuery.page;
        queryData.pageSize = cachePaginationQuery.pageSize;
    }

    fetchData(queryData);
}

function onReset() {
    basicFormRef.value!.resetForm();
}

async function fetchData(...args: any[]) {
    loading.value = true;
    try {
        const res = await props.fetchFn(...args);
        if (Array.isArray(res)) {
            tableData.value = res;
        } else {
            tableData.value = res.list;
            pagination.value = {
                page: res.page,
                pageSize: res.pageSize,
                pageCount: res.pageCount,
                itemCount: res.itemCount,
            }
        }
    } finally {
        loading.value = false;
    }
}

onMounted(() => fetchData(pagination.value));

function onPaginationPage({ page, pageSize }: { page?: number, pageSize?: number }) {
    if (pageSize) {
        page = 1;
    }

    cachePaginationQuery.page = page;
    cachePaginationQuery.pageSize = pageSize;
    onQuery();
}
</script>