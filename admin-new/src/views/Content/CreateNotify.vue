<template>
    <div>
        <QueryTable
            :pageable="true"
            :table-key="contentRouteConstant.notify.name"
            :table-columns="tableColumns"
            :fetch-fn="fetchTableData"
        >
            <NButton type="primary" @click="setCreateVisible(true)">新增</NButton>
        </QueryTable>

        <BasicModal
            v-model="createVisible"
            title="新增通知"
            :loading="createLoading"
            @submit="onSubmitCreate"
        >
            <BasicForm
                ref="createFormRef"
                :col="1"
                :rules="createRules"
                :schemas="createSchemas"
            ></BasicForm>
        </BasicModal>
    </div>

</template>
<script setup lang="ts">
import { NCard, type DataTableColumns, NTag, type DataTableBaseColumn, NButton, type FormRules } from 'naive-ui';
import QueryTable from '@/components/queryTable/queryTable.vue';
import { contentRouteConstant } from '@/router/constant';
import { h, ref } from 'vue';
import { reqCreateNotify, reqNotifyPage, type INotifyCreateRequest, type INotifyPageQuery } from '@/api/notify';
import BasicModal from '@/components/common/BasicModal.vue';
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { useState } from '@/hooks/common';

const tableColumns: DataTableBaseColumn[] = [
    { key: 'title', title: '标题' },
    { key: 'content', title: '内容' },
    {
        key: 'published', title: '是否发布', render(rowData, rowIndex) {
            if (rowData.published) {
                return h(NTag, { type: 'success' }, () => '已发布');
            }
            return h(NTag, { type: 'warning' }, () => '未发布');
        },
    }
];

const fetchTableData = (query: INotifyPageQuery) => {
    return reqNotifyPage(query);
};

const [createLoading, setCreateLoading] = useState(false);
const [createVisible, setCreateVisible] = useState(false);
const createFormRef = ref<InstanceType<typeof BasicForm> | null>(null);
const createRules: FormRules = {
    title: [
        { required: false, message: '未填写标题' }
    ],
    content: [
        { required: true, message: '未填写内容' }
    ]

};
const createSchemas: IBasicFormSchemas[] = [
    { filed: 'title', type: 'input', label: '标题' },
    {
        filed: 'content', type: 'input', label: '内容', props: {
            type: 'textarea'
        }
    }
];

const onSubmitCreate = async () => {
    await createFormRef.value!.validateForm();
    const formData = createFormRef.value!.formData as INotifyCreateRequest;
    setCreateLoading(true);
    try {
        await reqCreateNotify(formData);
        setCreateVisible(false);
    } finally {
        setCreateLoading(false);
    }
};
</script>