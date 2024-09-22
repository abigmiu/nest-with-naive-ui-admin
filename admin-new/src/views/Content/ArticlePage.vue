<template>
    <QueryTable
        :form-rules="formRules"
        :form-schemas="formSchemas"
        :pageable="true"
        :table-columns="tableColumns"
        :fetch-fn="fetchTableData"
        :table-key="contentRouteConstant.article.name"
    >
        <NButton @click="onAddBtn" type="primary">新增</NButton>
    </QueryTable>
</template>
<script setup lang="ts">
import { httpArticlePageQueryReq } from '@/api/article';
import type { IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import QueryTable from '@/components/queryTable/queryTable.vue';

import { NButton, type DataTableBaseColumn, type FormRules } from 'naive-ui';
import { useRouter } from 'vue-router';
import  { h } from 'vue';
import { renderBasicTableActionColumn } from '@/hooks/basicComponent';
import { contentRouteConstant } from '@/router/constant';


defineOptions({
    name: contentRouteConstant.article.name,
});

const router  = useRouter();

// 表单配置
const formSchemas: IBasicFormSchemas[] = [
    { filed: 'title', label: '文章名称', type: 'input' }
];
const formRules: FormRules = {};

// 表格配置
const tableRowActionRender = (row: any) => {
    return renderBasicTableActionColumn([
        { title: '编辑', props: {} },
        { title: '删除', props: {} },
        { type: 'more', props: {
            onSelect(key, rowData) {
                console.log("🚀 ~ onSelect ~ rowData:", rowData);
                console.log("🚀 ~ onSelect ~ key:", key);
                
            },
            rowData: row,
            options: [
                { label: '发布', key: 'publish' },
                { label: '取消发布', key: 'cancelPublish' }
            ]
        } }
    ]);
};
const tableColumns: DataTableBaseColumn[] = [
    {title: 'id', key: 'id', width: 200, fixed: 'left'},
    { title: '文章名称', key: 'title', width: 200, },
    { title: '创建时间', key: 'createdAt', width: 400, fixed: 'left' },
    { title: '更新时间', key: 'updatedAt', width: 400, },
    { title: '操作', key: 'actions', render: tableRowActionRender, fixed: 'right' },
];



// 表格数据请求
const fetchTableData = (query: any) => {
    const data = httpArticlePageQueryReq(query);
    return data;
};

// 新增
const onAddBtn = () => {
    router.push({
        name: contentRouteConstant.articleCreate.name
    });
};
</script>