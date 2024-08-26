<template>
    
    <QueryTable :form-rules="formRules" :form-schemas="formSchemas" :table-columns="tableColumns"></QueryTable>
  
</template>
<script setup lang="ts">
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { NButton, NCard, type DataTableColumns, type FormRules } from 'naive-ui';
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

const tableColumns: DataTableColumns = [
    {
        title: '名称',
        key: 'name'
    },
    {
        title: '创建时间',
        key: 'createdAt',
    },
    {
        title: '更新时间',
        key: 'updateAt',
    },
    {
        title: '账号',
        key: 'account',
    }
]
</script>