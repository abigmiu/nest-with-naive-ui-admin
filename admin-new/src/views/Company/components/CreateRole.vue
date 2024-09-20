<!-- 角色新增 -->
<template>
    <BasicModal
        title="新增角色"
        v-model="modalVisible"
        @submit="onSubmit"
        :loading="loading"
    >
        <BasicForm
            ref="formRef"
            :col="1"
            :schemas="formSchemas"
            :rules="formRules"
        >
            <template #permissionIds>
                <NTree
                    cascade
                    block-line
                    :data="permissionTreeData"
                    expand-on-click
                    checkable
                    key-field="id"
                    label-field="name"
                    @update-checked-keys="onPermissionChange"
                    @update-indeterminate-keys="onHalfPermissionChange"
                ></NTree>
            </template>
        </BasicForm>
    </BasicModal>
</template>
<script setup lang="ts">
import { reqPermissionSimpleList } from '@/api/permission';
import BasicModal from '@/components/common/BasicModal.vue';
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { useState } from '@/hooks/common';
import type { IPermissionSimpleListResponse } from '@/types/api/permission';
import { listToTree } from '@/utils/data';
import type { FormRules, TreeOption } from 'naive-ui';
import { reactive, ref, watch } from 'vue';
import { NTree } from 'naive-ui';
import { reqRoleCreate } from '@/api/role';
import type { IRoleCreateRequest } from '@/types/api/role';
// modal 弹窗
const visible = defineModel<boolean>({ default: false });
const [modalVisible, setModalVisible] = useState<boolean>(false);
watch(() => visible.value, (visibleStatus: boolean) => {
    setModalVisible(visibleStatus);
    if (visibleStatus) {
        fetchPermission();
    }
}, { immediate: true });

// 提交
const loading = ref(false);
async function onSubmit() { 
    const formEl = formRef.value!;
    await formEl.validateForm();
    const formData = formEl.formData as IRoleCreateRequest;

    const permissionIds = [...fullCheckedKeys, ...halfCheckedKeys ];
    const submitData: IRoleCreateRequest = {
        ...formData,
        permissionIds: permissionIds
    };

    loading.value = true;
    try {
        await reqRoleCreate(submitData);
        visible.value = false;
    } finally {
        loading.value = false;
    }
    
}

// 表单
const formRef = ref<InstanceType<typeof BasicForm> | null>(null);
const formRules: FormRules = {
    name: [
        { required: true, message: '请输入角色名称' },
    ],
    permissionIds: [
        { required: true, message: '请选择权限', type: 'array' }
    ]
};

const formSchemas = reactive<IBasicFormSchemas[]>([
    { field: 'name', label: '角色名称', type: 'input', props: { placeholder: '请输入角色名称' } },
    { field: 'remark', label: '备注', type: 'input', props: { placeholder: '请输入备注' } },
    { field: 'permissionIds', label: '权限', type: 'slot' }
]);

// 获取权限
const permissionTreeData = ref<TreeOption[]>([]);
let originPermissionTreeData: IPermissionSimpleListResponse[] = [];
const fetchPermission = async () => {
    const data = await reqPermissionSimpleList();
    originPermissionTreeData = data;
    const treeData = listToTree(data);
    permissionTreeData.value = treeData as unknown as TreeOption[];
};

// 权限修改
let fullCheckedKeys: number[] = [];
let halfCheckedKeys: number[] = []; // 半勾选的权限
const onPermissionChange = (keys: Array<number>) => {
    const formData = formRef.value!.formData;
    formData.permissionIds = keys;
    fullCheckedKeys = keys;
};
const onHalfPermissionChange = (keys: Array<number>) => {
    halfCheckedKeys = keys;
};

// 
</script>