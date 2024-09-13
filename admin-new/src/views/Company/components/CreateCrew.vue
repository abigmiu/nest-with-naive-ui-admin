<template>
    <NModal
        v-model:show="modelVisible"
        preset="card"
        size="huge"
        :bordered="false"
        :on-update:show="onModelVisibleChange"
        style="width: 600px"
        :mask-closable="false"
    >
        <template #header>
            新增用户
        </template>

        <BasicForm
            ref="formRef"
            :col="1"
            :schemas="formSchemas"
            :rules="formRules"
        ></BasicForm>

        <template #footer>
            <div class="flex justify-end">
                <NButton type="primary" @click="onSubmit" :loading="submitLoading">提交</NButton>
            </div>
        </template>
    </NModal>
</template>
<script setup lang="ts">
import { reqRoleSimpleList } from '@/api/role';
import { reqUserCreate } from '@/api/user';
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import type { IUserCreateRequest } from '@/types/api/user';
import { NButton, NModal, useMessage, type FormRules, type SelectOption, type SelectProps } from 'naive-ui';
import { cloneDeep } from 'es-toolkit';
import { watch, ref, onMounted, reactive } from 'vue';

const message = useMessage();

const modelVisible = ref(false);

const visible = defineModel({ default: false });
watch(visible, (val) => {
    modelVisible.value = val;
}, { immediate: true });

function onModelVisibleChange(val: boolean) {
    if (!val) {
        visible.value = false;
    }
}


const formRef = ref<InstanceType<typeof BasicForm> | null>(null);
const formRules: FormRules = {
    account: [
        { required: true, message: '请输入账号' }
    ],
    username: [
        { required: true, message: '请输入名称' }
    ],
    roleId: [
        { required: true, message: '请选择角色', type: 'number' }
    ]
};
const formSchemas = reactive<IBasicFormSchemas[]>([
    {
        field: 'account',
        label: '账号',
        type: 'input',
        props: {
            placeholder: '请输入账号'
        }
    },
    {
        field: 'username',
        label: '名称',
        type: 'input',
        props: {
            placeholder: '请输入名称'
        }
    },
    {
        field: 'password',
        label: '密码',
        type: 'input',
        props: {
            placeholder: '请输入密码,不填写则是默认密码'
        }
    },
    {
        field: 'roleId',
        label: '角色',
        type: 'select',
        props: {
            placeholder: '请选择角色',
            options: [],
        }
    }
]);

// 获取角色数据
async function getRoleData() {
    // @ts-expect-error 实例化过深
    const roleIdSchema = formSchemas.find((item) => item.field === 'roleId');
    const roleList = await reqRoleSimpleList();

    if (roleIdSchema) {
        (roleIdSchema.props as SelectProps).options = roleList.map((role) => ({
            label: role.name,
            value: role.id
        }));
    }
}

onMounted(getRoleData);

// 提交数据
const submitLoading = ref(false);
async function onSubmit() {
    submitLoading.value = true;
    try {
        await formRef.value!.validateForm();
        const formData = cloneDeep(formRef.value!.formData);
        await reqUserCreate(formData as IUserCreateRequest);
        modelVisible.value = false;
        onModelVisibleChange(false);
        message.success('创建成功');
    } finally {
        submitLoading.value = false;
    }

}
</script>