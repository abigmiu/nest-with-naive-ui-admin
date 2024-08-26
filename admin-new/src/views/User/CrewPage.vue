<template>
    
    <QueryTable :form-rules="formRules" :form-schemas="formSchemas"></QueryTable>
  
</template>
<script setup lang="ts">
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { NButton, NCard, type FormRules } from 'naive-ui';
import queryTable from '@/components/queryTable/queryTable.vue';
import QueryTable from '@/components/queryTable/queryTable.vue';
import { computed } from 'vue';


const formRules: FormRules = {
    name: [
        {
            required: true,
        }
    ]
}

const formSchemas: IBasicFormSchemas[] = [
    {
        field: 'name',
        label: '这是一个label',
        type: 'input',
        props: {
            placeholder: '请选择螟虫'
        }
    }
]

</script>