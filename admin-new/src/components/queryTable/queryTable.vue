<template>
    <NCard>
        <BasicForm :col="4" :rules="formRules" :schemas="formSchemas" ref="basicFormRef"></BasicForm>
        <div class="flex justify-end mb-4">
            <NButton class="mr-2" type="primary" @click="onQuery">查询</NButton>
            <NButton @click="onReset">重置</NButton>
        </div>
        <BasicTable :table-columns="tableColumns"></BasicTable>
    </NCard>
</template>
<script setup lang="ts">
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { NButton, NCard, type DataTableColumns, type FormRules } from 'naive-ui';
import { clone } from 'radash';
import { ref } from 'vue';
import BasicTable from '../table/BasicTable.vue';

interface IProps {
    formRules: FormRules,
    formSchemas: IBasicFormSchemas[],
    tableColumns: DataTableColumns
}
const props = defineProps<IProps>()

const basicFormRef = ref<null | InstanceType<typeof BasicForm>>(null);

async function onQuery() {
    const formEl = basicFormRef.value!;

    await formEl.validateForm();
    const queryData = clone(formEl.formData);

}

function onReset() {
    basicFormRef.value!.resetForm();
}
</script>