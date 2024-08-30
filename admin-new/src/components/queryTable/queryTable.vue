<template>
    <NCard>
        <BasicForm
            :col="4"
            :rules="formRules"
            :schemas="formSchemas"
            ref="basicFormRef"
        ></BasicForm>
        <div class="flex justify-end mb-4">
            <NButton
                class="mr-2"
                type="primary"
                @click="onQuery"
            >查询</NButton>
            <NButton @click="onReset">重置</NButton>
        </div>
        <BasicTable
            :table-columns="tableColumns"
            :fetch-fn="fetchFn"
            :pageable="pageable"
            ref="basicTableRef"
        >
            <slot></slot>
        </BasicTable>
    </NCard>
</template>
<script setup lang="ts">
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { NButton, NCard, NCollapse, NCollapseItem, type DataTableBaseColumn, type DataTableColumns, type FormRules, type PaginationProps } from 'naive-ui';
import { clone } from 'radash';
import { onMounted, ref } from 'vue';
import BasicTable from '../table/BasicTable.vue';
import type { IPageData } from '@/types/api/base';

export type IFetchFn = (...args: any[]) => Promise<any[] | IPageData>;

interface IProps {
    formRules: FormRules;
    formSchemas: IBasicFormSchemas[];
    tableColumns: DataTableBaseColumn[];
    pageable: boolean;
    fetchFn: IFetchFn;
}
const props = defineProps<IProps>();

const basicFormRef = ref<null | InstanceType<typeof BasicForm>>(null);
const basicTableRef = ref<null | InstanceType<typeof BasicTable>>(null);

async function onQuery(reset = false) {
    const formEl = basicFormRef.value!;
    await formEl.validateForm();
    const queryData = clone(formEl.formData);
    if (reset) {
        queryData.page = 1;
    }
    basicTableRef.value!.fetchData(queryData);
}

function onReset() {
    basicFormRef.value!.resetForm();
    onQuery();
}


</script>