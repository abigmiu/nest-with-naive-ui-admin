<template>
  <div class="edit-item">
    <BaseHeader @back="back">
      <template v-slot:center>
        <span v-if="editType === 'nickname'" class="f16">修改名字</span>
        <span v-if="editType === 'account'" class="f16">修改抖音号</span>
        <span v-if="editType === 'desc'" class="f16">修改简介</span>
      </template>
      <template v-slot:right>
        <div>
          <span class="f16" :class="isChanged ? 'save-yes' : 'save-no'" @click="save">保存</span>
        </div>
      </template>
    </BaseHeader>

    <div class="content">
      <div v-if="editType === 'nickname'">
        <div class="notice">我的名字</div>
        <div class="input-ctn" style="margin-bottom: 1rem">
          <input type="text" v-model="data.localUserinfo.nickname" placeholder="记得填写名字哦" maxlength="20" />
          <img v-if="data.localUserinfo.nickname" style="transform: scale(2)" class="close"
            src="../../../assets/img/icon/newicon/close-and-bg.png" alt="" @click="data.localUserinfo.nickname = ''" />
        </div>
        <div class="num">{{ data.localUserinfo.nickname.length }}/20</div>
      </div>
      <div class="l-row" v-if="editType === 'account'">
        <div class="notice">我的抖音号</div>
        <div class="input-ctn" style="margin-bottom: 10rem">
          <input type="text" v-model="data.localUserinfo.account" />
          <img v-if="data.localUserinfo.account" style="transform: scale(2)" class="close"
            src="../../../assets/img/icon/newicon/close-and-bg.png" alt="" @click="data.localUserinfo.account = ''" />
        </div>
        <div class="num">最多16个字，只允许包含字母、数字、下划线和点，30天内仅能修改一次</div>
      </div>
      <div class="l-row" v-if="editType === 'desc'">
        <div class="notice">个人简介</div>
        <div class="textarea-ctn">
          <textarea name="" id="" cols="30" rows="10" v-model="data.localUserinfo.desc"
            placeholder="你可以填写兴趣爱好、心情愿望，有趣的介绍能让被关注的概率变高噢！"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//TODO 1、数据变了后，保存按钮变亮；2、数据变了，点返回，弹窗是否确认

import { httpUpdateUserInfo, type IHttpUpdateUserInfo } from '@/api/user';
import { useBaseStore } from '@/store/pinia'
import { useUserStore } from '@/store/user';
import {
  _hideLoading,
  _notice,
  _showLoading,
  _showSimpleConfirmDialog,
  _sleep,
  cloneDeep
} from '@/utils'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EditUserInfo from './EditUserInfo.vue';

type IEditType = 'nickname' | 'account' | 'desc'

defineOptions({
  name: 'EditUserInfo'
})
const store = useBaseStore()
const userStore = useUserStore();
const router = useRouter()
const route = useRoute()

let editType = ref<IEditType>('account');
const data = reactive({
  localUserinfo: {
    nickname: '',
    signature: '',
    account: '',
    desc: ''
  }
})
const isChanged = computed(() => {
  if (editType.value === 'nickname') {
    if (!data.localUserinfo.nickname.trim()) {
      return false;
    }
    return userStore.userInfo.nickname !== data.localUserinfo.nickname
  }
  if (editType.value === 'account') {
    if (!data.localUserinfo.account.trim()) {
      return false;
    }
    const hasChanged = userStore.userInfo.account !== data.localUserinfo.account;
    if (hasChanged) {
      return /^[a-zA-Z0-9_.]{1,16}$/.test(data.localUserinfo.account)
    } else {
      return false;
    }
  }

  if (editType.value === 'desc') {
    return userStore.userInfo.intro !== data.localUserinfo.desc
  }

  return false
})

onMounted(() => {
  data.localUserinfo = cloneDeep({
    ...store.userinfo,
    ...userStore.userInfo,
  })
  editType.value = route.query.type as IEditType;
})

function back() {
  if (isChanged.value) {
    _showSimpleConfirmDialog('是否保存修改', save, router.back)
  } else {
    router.back()
  }
}

async function save() {
  if (!isChanged.value) return
  if (editType.value === 'nickname') {
    if (!data.localUserinfo.nickname) return _notice('名字不能为空')
  }
  _showLoading()
  try {
    await submit();
    store.setUserinfo(data.localUserinfo)

    router.back()
    if (editType.value === 'desc') return _notice('新签名保存成功')
  } finally {
    _hideLoading()
  }

}

async function submit() {
  const submitData: IHttpUpdateUserInfo = {};
  if (editType.value === 'nickname') {
    submitData.nickname = data.localUserinfo.nickname;
  }
  if (editType.value === 'account') {
    submitData.account = data.localUserinfo.account;
  }
  if (editType.value === 'desc') {
    submitData.intro = data.localUserinfo.desc;
  }
  await httpUpdateUserInfo(submitData);

  if (editType.value === 'nickname') {
    userStore.userInfo.nickname = data.localUserinfo.nickname;
  }
  if (editType.value === 'account') {
    userStore.userInfo.account = data.localUserinfo.account;
  }
  if (editType.value === 'desc') {
    userStore.userInfo.intro = data.localUserinfo.desc;
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/index';

.edit-item {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  .save-yes {
    color: var(--primary-btn-color);
  }

  .save-no {
    color: var(--disable-primary-btn-color);
  }

  .content {
    padding: 20rem;
    padding-top: 70rem;

    .notice,
    .num {
      font-size: 12rem;
      color: var(--second-text-color);
    }

    .input-ctn {
      position: relative;
      border-bottom: 1px solid var(--line-color);
      display: flex;
      align-items: center;

      input {
        margin: 5rem 0;
        color: white;
        height: 30rem;
        width: 100%;
        outline: none;
        border: none;
        background: transparent;

        &::placeholder {
          color: var(--second-text-color);
        }
      }

      .close {
        position: absolute;
        right: 0;
        top: 15rem;
        width: 10rem;
      }
    }

    .textarea-ctn {
      width: 100%;
      background: var(--active-main-bg);
      padding: 15rem;
      box-sizing: border-box;
      margin-top: 10rem;
      border-radius: 2px;

      textarea {
        font-family: 'Microsoft YaHei UI';
        outline: none;
        width: 100%;
        border: none;
        background: transparent;
        color: white;

        &::placeholder {
          color: var(--second-text-color);
        }
      }
    }
  }
}
</style>
