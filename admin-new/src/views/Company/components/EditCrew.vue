<template>
    <BasicModal
        title="编辑用户"
        v-model="modalVisible"
        @submit="onSubmit"
        :loading="loading"
    >
        <BasicForm
            ref="formRef"
            :schemas="formSchemas"
            :rules="formRules"
            :col="1"
            :data="userInfo"
        ></BasicForm>
    </BasicModal>
</template>
<script setup lang="ts">
import { reqRoleSimpleList } from '@/api/role';
import { reqUserBaseInfo, reqUserCreate, reqUserEdit } from '@/api/user';
import BasicModal from '@/components/common/BasicModal.vue';
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import type { IBaseUserInfoResponse, IUserEditForm, IUserEditRequest } from '@/types/api/user';
import { message } from '@/utils/global';
import { useMessage, type FormRules, type SelectProps } from 'naive-ui';
import { onMounted, reactive, ref, watch } from 'vue';

const modalVisible = ref(false);

interface IProps {
    userId?: number
}
const props = defineProps<IProps>();

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
        filed: 'account',
        label: '账号',
        type: 'input',
        props: {
            placeholder: '请输入账号'
        }
    },
    {
        filed: 'username',
        label: '名称',
        type: 'input',
        props: {
            placeholder: '请输入名称'
        }
    },
    {
        filed: 'roleId',
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
    const roleIdSchema = formSchemas.find((item) => item.filed === 'roleId');
    const roleList = await reqRoleSimpleList();

    if (roleIdSchema) {
        (roleIdSchema.props as SelectProps).options = roleList.map((role) => ({
            label: role.name,
            value: role.id
        }));
    }
}
onMounted(getRoleData);


const userInfo = ref<Partial<IUserEditForm>>({});
async function fetchData(id: number) {
    const res = await reqUserBaseInfo(id);
    const roleIdSchema = formSchemas.find((item) => item.filed === 'roleId');
    if (roleIdSchema) {
        let options = (roleIdSchema.props as SelectProps).options;
        if (!options?.length) {
            options = [
                {
                    label: res.role.name,
                    value: res.role.id
                }
            ];
        }

    }
    userInfo.value = res;
}

watch(() => props.userId, (userId) => {
    if (userId) {
        modalVisible.value = true;
        fetchData(userId);
    } else {
        modalVisible.value = false;
    }
});

const loading = ref(false);

async function onSubmit() {
    formRef.value!.validateForm();
    const formData = formRef.value!.formData as IUserEditForm;
    loading.value = true;
    try {
        const submitData: IUserEditRequest = {
            id: props.userId!,
            account: formData.account,
            username: formData.username,
            roleId: formData.roleId
        };
        await reqUserEdit(submitData);
        message.success('编辑成功');
    } finally {
        loading.value = false;
    }

}
</script>