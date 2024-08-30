<template>
    <QueryTable
        :form-rules="formRules"
        :form-schemas="formSchemas"
        :table-columns="tableColumns"
        :fetch-fn="fetchData"
        :pageable="true"
    >
        <NButton
            type="primary"
            @click="setCreateVisible(true)"
        >新增</NButton>
    </QueryTable>
    <CreateCrew v-model="createVisible"></CreateCrew>
</template>
<script setup lang="ts">
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { NButton, NCard, type DataTableBaseColumn, type DataTableColumns, type FormRules } from 'naive-ui';
import queryTable from '@/components/queryTable/queryTable.vue';
import QueryTable from '@/components/queryTable/queryTable.vue';
import { computed, ref } from 'vue';
import { reqUserPage } from '@/api/user';
import type { IUserPageRequest, IUserPageResponse } from '@/types/api/user';
import CreateCrew from './components/CreateCrew.vue';
import { useState } from '@/hooks/common';

const [createVisible, setCreateVisible] = useState<boolean>(false);


const formRules: FormRules = {}

const formSchemas: IBasicFormSchemas[] = [
    {
        field: 'name',
        label: '名称',
        type: 'input',
        props: {
            placeholder: '请选择名称'
        }
    }
]

const tableColumns: DataTableBaseColumn<IUserPageResponse>[] = [
    {
        title: 'ID',
        key: 'id',
    },
    {
        title: '账号',
        key: 'account',
    },
    {
        title: '名称',
        key: 'username'
    },
    {
        title: '创建时间',
        key: 'createdAt',
    },
    {
        title: '更新时间',
        key: 'updatedAt',
    },
]


const fetchData = async (data: IUserPageRequest) => {
    const res = await reqUserPage(data);
    return res;
}
</script>