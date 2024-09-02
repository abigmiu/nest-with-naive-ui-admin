<template>
    <BasicModal
        :loading="modalLoading"
        @submit="onSubmit"
        v-model="modalVisible"
        title="编辑角色"
    >
        <BasicForm
            ref="formRef"
            :col="1"
            :rules="formRules"
            :schemas="formSchemas"
            :data="originData"
        >
            <template #permissionIds>
                <NTree
                    cascade
                    block-line
                    :checked-keys="defaultPermissionIds"
                    :data="permissionTreeOptions"
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
import { reqRoleEdit, reqRoleInfo } from '@/api/role';
import BasicModal from '@/components/common/BasicModal.vue';
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import type { IRoleEditRequest } from '@/types/api/role';
import { listToTree } from '@/utils/data';
import type { FormRules, TreeOption } from 'naive-ui';
import { onMounted, reactive, ref, watch } from 'vue';
import { NTree } from 'naive-ui';

interface IProps {
    roleId?: number;
}
const props = defineProps<IProps>();

const modalVisible = defineModel<boolean>({ default: false });

const formRef = ref<InstanceType<typeof BasicForm> | null>(null);

// 表单配置
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

// 提交编辑
const modalLoading = ref(false);
async function onSubmit() {
    const formEl = formRef.value!;
    await formEl.validateForm();
    const formData = formEl.formData as IRoleEditRequest;
    modalLoading.value = true;
    try {
        await reqRoleEdit({
            ...formData,
            roleId: props.roleId!,
            permissionIds: [...defaultPermissionIds.value, ...halfCheckedKeys ]
        });
        modalVisible.value = false;
    } finally {
        modalLoading.value = false;
    }
}

// 获取权限
const permissionTreeOptions = ref<TreeOption[]>([]);
const fetchPermission = async () => {
    const data = await reqPermissionSimpleList();
    const treeData = listToTree(data);
    permissionTreeOptions.value = treeData as unknown as TreeOption[];
};
onMounted(fetchPermission);

// 权限修改
const defaultPermissionIds = ref<number[]>([]);
    let halfCheckedKeys: number[] = [];
const onPermissionChange = (keys: Array<number>) => {
    const formData = formRef.value!.formData;
    formData.permissionIds = keys;
    defaultPermissionIds.value = keys;
};
const onHalfPermissionChange = (keys: Array<number>) => {
    console.log("🚀 ~ onHalfPermissionChange ~ keys:", keys);
    
    halfCheckedKeys = keys;
};

// 获取基本数据

const originData = ref<Partial<IRoleEditRequest>>({});
const fetchRoleData = async () => {
    const data = await reqRoleInfo(props.roleId!) as IRoleEditRequest;
    originData.value = data ;
    defaultPermissionIds.value = data.permissionIds;
};
watch(() => modalVisible.value, (visible) => {
    const roleId = props.roleId;
    if (visible && roleId && roleId > 0) {
        fetchRoleData();
    }
});
</script>