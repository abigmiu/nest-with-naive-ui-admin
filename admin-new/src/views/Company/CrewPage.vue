<template>
    <QueryTable
        :form-rules="formRules"
        :form-schemas="formSchemas"
        :table-columns="tableColumns"
        :fetch-fn="fetchData"
        :pageable="true"
    >
        <NButton type="primary" @click="setCreateVisible(true)">新增</NButton>

        <NDropdown trigger="hover" :options="importDropdownOptions" :on-select="importDropdownSelect" >
            <NButton icon-placement="right" class="ml-2" :loading="importDropDownLoading">
                <template #icon>
                    <n-icon>
                        <DownOutlined />
                    </n-icon>
                </template>
                导入
            </NButton>
        </NDropdown>

    </QueryTable>
    <CreateCrew v-model="createVisible"></CreateCrew>
</template>
<script setup lang="ts">
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { NButton, NDropdown, NIcon, NCard, useDialog, useMessage, type DataTableBaseColumn, type DataTableColumns, type DropdownProps, type FormRules } from 'naive-ui';
import queryTable from '@/components/queryTable/queryTable.vue';
import QueryTable from '@/components/queryTable/queryTable.vue';
import { computed, h, ref } from 'vue';
import { reqUserExport, reqUserPage, reqUserResetPassword, reqUserTemplate } from '@/api/user';
import type { IUserPageRequest, IUserPageResponse } from '@/types/api/user';
import CreateCrew from './components/CreateCrew.vue';
import { useState } from '@/hooks/common';
import TableActionMore from '../../components/table/components/TableActionMore.vue';
import { rowDark } from 'naive-ui/es/legacy-grid/styles';
import { DownOutlined } from '@vicons/antd';

const [createVisible, setCreateVisible] = useState<boolean>(false);


const formRules: FormRules = {};

const formSchemas: IBasicFormSchemas[] = [
    {
        field: 'name',
        label: '名称',
        type: 'input',
        props: {
            placeholder: '请选择名称'
        }
    }
];

const moreActionOptions: DropdownProps['options'] = [
    {
        label: '重置密码',
        key: 'resetPassword',
    },
];


const dialog = useDialog();
const message = useMessage();
const resetPassword = (rowData: IUserPageResponse) => {
    const d = dialog.warning({
        title: '重置密码',
        content: `确定重置用户 ${rowData.username} 的密码？`,
        positiveText: '确定重置',
        onPositiveClick: async () => {
            d.loading = true;
            try {
                await reqUserResetPassword(rowData.id);
                message.success('重置成功');
            } finally {
                d.loading = false;
            }
        }
    });
};

const onMoreActionSelect = (key: string, rowData: IUserPageResponse) => {
    if (key === 'resetPassword') {
        resetPassword(rowData);
    }
};

const tableColumns: DataTableBaseColumn[] = [
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
    {
        title: '操作',
        key: 'actions',
        render(row, index) {
            return [
                h(NButton, {
                    type: 'default',
                    size: 'small',

                    onClick: () => {
                        console.log(row);
                    }
                }, {
                    default: () => '编辑'
                }),
                h(TableActionMore, {
                    options: moreActionOptions,
                    onSelect: onMoreActionSelect,
                    rowData: row,
                }, {}
                )
            ];
        }
    }
];


const fetchData = async (data: IUserPageRequest) => {
    const res = await reqUserPage(data);
    return res;
};


// 导入
const importDropDownLoading = ref(false);
const importDropdownOptions: DropdownProps['options'] = [
    {
        label: '获取导入模板',
        key: 'getTemplate',
    },
    {
        label: '导入用户',
        key: 'importUser',
    },
    {
        label: '导出用户',
        key: 'exportUser',
    }
];

const getUserImportTemplate = async () =>  {
    importDropDownLoading.value = true;
    try {
        await reqUserTemplate();
    } finally {
        importDropDownLoading.value = false;
    }
};

const getUserExport = async () => {
    importDropDownLoading.value = true;
    try {
        await reqUserExport();
    } finally {
        importDropDownLoading.value = false;
    }
};

const importDropdownSelect = (key: string) => {
    if (key === 'getTemplate') {
        getUserImportTemplate();
    }
    if (key === 'importUser') {}
    if (key === 'exportUser') {
        getUserExport();
    }
};
</script>