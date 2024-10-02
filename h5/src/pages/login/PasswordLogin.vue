<template>
  <div class="PasswordLogin">
    <BaseHeader mode="light" backMode="dark" backImg="back">
      <template v-slot:right>
        <span class="f14" @click="$router.push('/login/help')">帮助与设置</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="desc">
        <div class="title">手机号密码登录</div>
      </div>

      <LoginInput autofocus type="phone" v-model="phone" placeholder="请输入手机号" />
      <LoginInput autofocus class="mt1r" type="password" v-model="password" placeholder="请输入密码" />
      <LoginProtocol ref="protocolRef">
        <div>
          已阅读并同意
          <span class="link" @click="$router.push('/service-protocol', { type: '“抖音”用户服务协议' })">用户协议</span>
          和
          <span class="link" @click="$router.push('/service-protocol', { type: '“抖音”隐私政策' })">隐私政策</span>
          ，同时登录并使用抖音火山版（原“火山小视频”）和抖音
        </div>
      </LoginProtocol>


      <div class="notice" v-if="notice">
        {{ notice }}
      </div>

      <dy-button type="primary" :loading="loading" :active="false" :disabled="disabled" @click="login">
        {{ loading ? '登录中' : '登录' }}
      </dy-button>

      <div class="options">
        <span>
          忘记了？<span class="link" @click="$router.push('/login/retrieve-password')">找回密码</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import LoginInput from './components/LoginInput'
import Base from './Base'
import LoginProtocol from './components/LoginProtocol.vue';
import { computed, ref } from 'vue';
import { httpPhonePasswordLogin } from '@/api/user';
import { useUserStore } from '@/store/user';
import { useRoute, useRouter } from 'vue-router';
import { useBaseStore } from '@/store/pinia';

defineOptions({
  name: 'PasswordLogin',
})

const phone = ref('');
const password = ref('');
const code = ref('');
const notice = ref('');

const loading = ref(false);
const disabled = computed(() => !(phone.value && password.value))

const protocolRef = ref<InstanceType<typeof LoginProtocol> | null>(null);
const userStore = useUserStore();
const baseStore = useBaseStore();
const route = useRoute();
const router = useRouter()
const login = async () => {
  const verifyRes = protocolRef.value!.verify();
  if (!verifyRes) return;
  loading.value = true;
  try {
    const res = await httpPhonePasswordLogin({
      type: 1,
      phone: phone.value,
      password: password.value
    })
    userStore.setUserInfo(res);
    route.meta.customTransition = true;
    route.meta.leaveTransition = '';
    // baseStore.useCustomTransition = true;
    // baseStore.transitionName = '';
    router.back();
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';
@import './loginBase.less';

.PasswordLogin {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: black;
  font-size: 14rem;
  background: white;

}
</style>
