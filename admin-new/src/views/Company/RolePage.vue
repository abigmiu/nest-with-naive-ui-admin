<template>
    <QueryTable
        :form-rules="formRules"
        :form-schemas="formSchemas"
        :pageable="false"
        :fetch-fn="fetchTableData"
        :table-columns="tableColumns"
    >
        <NButton @click="setCreateVisible(true)" type="primary">新增</NButton>
    </QueryTable>
    <CreateRole v-model="createVisible"></CreateRole>
    <EditRole v-model="editVisible" :role-id="editRoleId"></EditRole>
</template>
<script setup lang="ts">
import { reqRoleList } from '@/api/role';
import type { IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import QueryTable from '@/components/queryTable/queryTable.vue';
import { useState } from '@/hooks/common';
import type { IRoleListQueryRequest, IRoleListResponse } from '@/types/api/role';
import { NButton, type DataTableBaseColumn, type FormRules } from 'naive-ui';
import CreateRole from './components/CreateRole.vue';
import EditRole from './components/EditRole.vue';
import { h, ref } from 'vue';
import { companyRouteConstant } from '@/router/modules/company';

defineOptions({
    name: companyRouteConstant.role.name
});

// 搜索表单配置
const formRules: FormRules = {};
const formSchemas: IBasicFormSchemas[] = [
    { field: 'name', label: '角色名称', type: 'input', props: { placeholder: '请输入角色名称' } }
];

// 表格配置
const tableRowActionRender = (row: IRoleListResponse) => {
 return [
    h(
        NButton, 
        { type: 'default', size: 'small', onClick: () => {editRoleId.value = row.id; setEditVisible(true);} },
        { default: () => '编辑' }
    )
 ];
};

const tableColumns: DataTableBaseColumn<IRoleListResponse>[] = [
    { title: 'ID', key: 'id' },
    { title: '角色名称', key: 'name' },
    { title: '备注', key: 'remark' },
    { title: '创建时间', key: 'createdAt' },
    { title: '更新时间', key: 'updatedAt' },
    { title: '操作', key: 'actions', render: tableRowActionRender },
];


// 表格数据请求
const fetchTableData = (query: IRoleListQueryRequest) => {
    const data = reqRoleList(query);
    return data;
};

// 新增
const [ createVisible, setCreateVisible ] = useState<boolean>(false);

// 编辑
const [ editVisible, setEditVisible ] = useState<boolean>(false);
const editRoleId = ref(-1);
</script>