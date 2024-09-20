<template>
    <div>
        <h2 class="font-bold text-lg mb-4">基础资料</h2>

        <div class="profile-item">
            <div class="title">用户昵称</div>
            <div class="content">
                <NInput class="content__input" v-model:value="userName"></NInput>
                <NButton class="ml-2" @click="onUpdateUserName" :loading="userNameLoading">保存</NButton>
            </div>
        </div>

        <div class="profile-item">
            <div class="title">头像</div>
            <div class="content">
                <BasicUpload @uploaded="onAvatarUpload">
                    <NTooltip trigger="hover">
                        <template #trigger>
                            <NAvatar :src="userAvatar" :size="96"></NAvatar>
                        </template>
                        点击上传新头像
                    </NTooltip>
                </BasicUpload>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reqUserUpdateProfile } from '@/api/user';
import BasicUpload from '@/components/common/BasicUpload.vue';
import { useState } from '@/hooks/common';
import { useUserStore } from '@/stores/userStore';
import { NInput, NButton, NAvatar, useMessage, NTooltip } from 'naive-ui';
import { ref } from 'vue';

const message = useMessage();

const userStore = useUserStore();
const { userInfo } = userStore;

const userName = ref(userInfo?.username || '');
const [userNameLoading, setUserNameLoading] = useState(false);
const onUpdateUserName = async () => {
    const trimmedUserName = userName.value.trim();
    if (!trimmedUserName.length) return;
    setUserNameLoading(true);
    try {
        await reqUserUpdateProfile({
            username: trimmedUserName
        });
        userInfo!.username = userName.value;
        message.success("用户名修改成功");
    } finally {
        setUserNameLoading(false);
    }

};

const userAvatar = ref(userInfo?.avatar || '');
const [userAvatarLoading, setUserAvatarLoading] = useState(false);
const onAvatarUpload = (url: string) => {
    userAvatar.value = url;
    userInfo!.avatar = url;
};
</script>

<style lang="scss" scoped>
.profile-item {
    margin-bottom: 16px;
    .title {
        font-size: 16px;
        font-weight: 500;
        color: rgba(31, 34, 37, 0.8);
        margin-bottom: 10px;
    }
    .content {
    
        display: flex;
        &__input {
            width: 300px;
            max-width: 300px;
        }
    }
}
</style>