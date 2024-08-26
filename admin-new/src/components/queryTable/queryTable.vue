<template>
    <NCard>
        <BasicForm :col="4" :rules="formRules" :schemas="formSchemas" ref="basicFormRef"></BasicForm>
        <div class="flex justify-end">
            <NButton class="mr-2" type="primary" @click="onQuery">查询</NButton>
            <NButton @click="onReset">重置</NButton>
        </div>
    </NCard>
</template>
<script setup lang="ts">
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { NButton, NCard, type FormRules } from 'naive-ui';
import { clone } from 'radash';
import { ref } from 'vue';

interface IProps {
    formRules: FormRules,
    formSchemas: IBasicFormSchemas[]
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