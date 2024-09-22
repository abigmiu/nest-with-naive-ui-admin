<template>
    <div class="view-account">
        <div class="view-account-header"></div>
        <div class="view-account-container">
            <div class="view-account-top">
                <div class="view-account-top-logo">
                    <h1>登录</h1>
                </div>
                <div class="view-account-top-desc">后台管理系统</div>
            </div>
            <div class="view-account-form">
                <n-form
                    ref="formRef"
                    label-placement="left"
                    size="large"
                    :model="formInline"
                    :rules="rules"
                    @submit="handleSubmit"
                >
                    <n-form-item path="account">
                        <n-input v-model:value="formInline.account" placeholder="请输入用户账号">
                            <template #prefix>
                                <n-icon size="18" color="#808695">
                                    <PersonOutline />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item path="password">
                        <n-input
                            v-model:value="formInline.password"
                            type="password"
                            showPasswordOn="click"
                            placeholder="请输入密码"
                        >
                            <template #prefix>
                                <n-icon size="18" color="#808695">
                                    <LockClosedOutline />
                                </n-icon>
                            </template>
                        </n-input>
                    </n-form-item>
                    <n-form-item class="default-color">
                        <div class="flex justify-between">
                            <div class="flex-initial">
                                <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
                            </div>
                        </div>
                    </n-form-item>
                    <n-form-item>
                        <n-button
                            attr-type="submit"
                            type="primary"
                            size="large"
                            :loading="loading"
                            block
                        >
                            登录
                        </n-button>
                    </n-form-item>
                </n-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NButton, NInput, NForm, NFormItem, NIcon, NCheckbox, type FormInst } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5';
import type { ILoginRequest } from '@/types/api/user';
import { reqLogin } from '@/api/auth';
import { useUserStore } from '@/stores/userStore';
import { MD5 } from 'crypto-js';
import { dashboardRouteConstant } from '@/router/constant';
import { useSystemSettingStore } from '@/stores/systemSettingStore';
import { message } from '@/utils/global';


const formRef = ref<FormInst>();
const loading = ref(false);
const autoLogin = ref(true);
const formInline = reactive({
    account: '',
    password: '',
});

const rules = {
    account: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
};

const userStore = useUserStore();
const systemSettingStore = useSystemSettingStore();

const router = useRouter();
const route = useRoute();

const handleLogin = async () => {
    const { account, password } = formInline;
    const params: ILoginRequest = {
        account,
        password: MD5(password).toString(),
    };

    const loginResponse = await reqLogin(params);
    userStore.setUserInfo(loginResponse);

    await systemSettingStore.getList();

    const { redirect } = route.query;
    if (redirect && typeof redirect === 'string') {
        router.replace(decodeURIComponent(redirect));
    } else {
        router.replace({
            name: dashboardRouteConstant.workspace.name
        });
    }
    await nextTick();
};
const handleSubmit = (e: Event) => {
    e.preventDefault();
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            loading.value = true;

            try {
                await handleLogin();
            } finally {
                loading.value = false;
            }
        } else {
            message.error('请填写完整信息');
        }
    });

};
</script>

<style lang="scss" scoped>
.view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
        flex: 1;
        padding: 32px 12px;
        max-width: 384px;
        min-width: 320px;
        margin: 0 auto;
    }

    &-top {
        padding: 32px 0;
        text-align: center;

        &-desc {
            font-size: 14px;
            color: #808695;
        }
    }

    &-other {
        width: 100%;
    }

    .default-color {
        color: #515a6e;

        .ant-checkbox-wrapper {
            color: #515a6e;
        }
    }
}

@media (min-width: 768px) {
    .view-account {
        background-image: url('../../assets/images/login.svg');
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
    }

    .page-account-container {
        padding: 32px 0 24px 0;
    }
}
</style>