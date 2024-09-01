<template>
    <QueryTable
        :form-rules="formRules"
        :form-schemas="formSchemas"
        :pageable="true"
        :table-columns="tableColumns"
        :fetch-fn="fetchTableData"
    >
        <NButton @click="onAddBtn">新增</NButton>
    </QueryTable>
</template>
<script setup lang="ts">
import type { IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import QueryTable from '@/components/queryTable/queryTable.vue';
import { contentRouteConstant } from '@/router/modules/content';
import { reqArticlePageRequest } from '@/types/api/article';
import { NButton, type DataTableBaseColumn, type FormRules } from 'naive-ui';
import { useRouter } from 'vue-router';

const router  = useRouter();

// 表单配置
const formSchemas: IBasicFormSchemas[] = [
    { field: 'title', label: '文章名称', type: 'input' }
];
const formRules: FormRules = {};

// 表格配置
const tableColumns: DataTableBaseColumn[] = [
    {title: 'id', key: 'id'},
    { title: '文章名称', key: 'title' },
    { title: '创建时间', key: 'createdAt' },
    { title: '更新时间', key: 'updatedAt' },
];

// 表格数据请求
const fetchTableData = (query: any) => {
    const data = reqArticlePageRequest(query);
    return data;
};

// 新增
const onAddBtn = () => {
    router.push({
        name: contentRouteConstant.articleCreate.name
    });
};
</script>