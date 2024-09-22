<template>
    <BasicModal
        title="修改密码"
        :loading="submitLoading"
        @submit="onSubmit"
        v-model="modalVisible"
    >
        <BasicForm
            ref="formRef"
            :rules="rules"
            :col="1"
            :schemas="schemas"
        >
        </BasicForm>
    </BasicModal>

</template>
<script setup lang="ts">
import { reqUserUpdatePassword } from '@/api/user';
import BasicModal from '@/components/common/BasicModal.vue';
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { useState } from '@/hooks/common';
import { message } from '@/utils/global';
import { MD5 } from 'crypto-js';

import { type FormRules } from 'naive-ui';
import { ref } from 'vue';

const modalVisible = defineModel({ default: false });


const formRef = ref<InstanceType<typeof BasicForm> | null>(null);

const rules: FormRules = {
    password: [
        { required: true, message: '未填写密码' }
    ],
    confirmPassword: [
        {
            required: true,
            
            validator: (_, value: string) => {
                if (!value) {
                    return new Error('未填写确认密码');
                }
                const formData = formRef.value!.formData;
                if (formData.password !== formData.confirmPassword) {
                    return new Error('两次密码不一致');
                }
                return true;
            }
        },
    ]
};
const schemas: IBasicFormSchemas[] = [
    { label: '密码', filed: 'password', type: 'input', props: { type: 'password' } },
    { label: '确认密码', filed: 'confirmPassword', type: 'input', props: { type: 'password' } }
];

const [submitLoading, setSubmitLoading] = useState(false);
const onSubmit = async () => {
    try {
        await formRef.value!.validateForm();
        setSubmitLoading(true);
        const password = formRef.value!.formData.password;
        await reqUserUpdatePassword({
            password: MD5(password).toString(),
        });
        modalVisible.value = false;
        message.success("密码修改成功");
    } finally {
        setSubmitLoading(false);
    }
};
</script>