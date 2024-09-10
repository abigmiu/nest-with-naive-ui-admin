<template>
    <div>
        <QueryTable
            :form-rules="formRules"
            :form-schemas="formSchemas"
            :table-columns="tableColumns"
            :fetch-fn="fetchData"
            :pageable="true"
            :table-key="companyRouteConstant.crew.name"
        >
            <AuthWrapper :auth="PERMISSIONS.CREW_CREATE">
                <NButton type="primary" @click="setCreateVisible(true)">新增</NButton>
            </AuthWrapper>
        

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
        <EditCrew :userId="editUserId"></EditCrew>
    </div>
    
</template>
<script setup lang="ts">
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { NButton, NDropdown, NIcon, NCard, useDialog, useMessage, type DataTableBaseColumn, type DataTableColumns, type DropdownProps, type FormRules } from 'naive-ui';
import queryTable from '@/components/queryTable/queryTable.vue';
import QueryTable from '@/components/queryTable/queryTable.vue';
import { computed, h, onBeforeUnmount, ref } from 'vue';
import { reqUserExport, reqUserImport, reqUserPage, reqUserResetPassword, reqUserTemplate } from '@/api/user';
import type { IUserPageRequest, IUserPageResponse } from '@/types/api/user';
import CreateCrew from './components/CreateCrew.vue';
import EditCrew from './components/EditCrew.vue';
import { useState } from '@/hooks/common';
import TableActionMore from '../../components/table/components/TableActionMore.vue';
import { rowDark } from 'naive-ui/es/legacy-grid/styles';
import { DownOutlined } from '@vicons/antd';
import { companyRouteConstant } from '@/router/modules/company';
import AuthWrapper from '@/components/common/AuthWrapper.vue';
import { PERMISSIONS } from '@/utils/constant';

defineOptions({
    name: companyRouteConstant.crew.name
});

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
    {
        title: '操作',
        key: 'actions',
        render(row, index) {
            return [
                h(NButton, {
                    type: 'default',
                    size: 'small',

                    onClick: () => {
                        onEdit(row.id);
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

const userImport = () => {
    let inputEl: null | HTMLInputElement = document.createElement('input');
    inputEl.type = 'file';
    inputEl.style.display = 'none';

    const removeEl = () => {
        if (inputEl) {
            inputEl.remove();
            inputEl = null;
        }
    };
    inputEl.onchange = async () => {
        const file = inputEl!.files?.[0];
        if (!file) {
            message.error('请选择文件');
            return;
        }
        importDropDownLoading.value = true;
        try {
            await reqUserImport(file);
        } finally {
            removeEl();
            importDropDownLoading.value = false;
        }
    };
    document.body.appendChild(inputEl);
    inputEl.click();

    onBeforeUnmount(() => {
        removeEl();
    });
};

const importDropdownSelect = (key: string) => {
    if (key === 'getTemplate') {
        getUserImportTemplate();
    }
    if (key === 'importUser') {
        userImport();
    }
    if (key === 'exportUser') {
        getUserExport();
    }
};

// 编辑
const editUserId = ref(0);

const onEdit = (id: number) => {
    editUserId.value = id;
};
</script>