<template>
    <div>
        <NCard :bordered="false" title="工作台">
            <NGrid cols="2 s:1 m:1 l:2 xl:2 2xl:2" responsive="screen">
                <NGi>
                    <div class="flex items-center">
                        <div>
                            <NAvatar circle :size="64" :src="avatar || ''" />
                        </div>
                        <div>
                            <p class="px-4 text-xl">{{ username }}，开始您一天的工作吧！</p>
                            <p class="px-4 text-gray-400">您已使用系统 {{ usedDays }} 天</p>
                        </div>
                    </div>
                </NGi>
                <NGi>

                </NGi>
            </NGrid>
        </NCard>

        <div class="flex mt-10">
            <NCard :bordered="false" title="登录日志">
                <LoginLog />
            </NCard>
            <NCard :bordered="false" class="ml-2" title="系统通知">
                <NotifyBox></NotifyBox>
            </NCard>
        </div>
       
    </div>
</template>

<script setup lang="ts">
import { dashboardRouteConstant } from '@/router/constant';
import { useUserStore } from '@/stores/userStore';
import dayjs from 'dayjs';
import { NCard, NGrid, NGi, NAvatar } from 'naive-ui';
import LoginLog from './LoginLog.vue';
import NotifyBox from './NotifyBox.vue';

defineOptions({
    name: dashboardRouteConstant.workspace.name
});

const userStore = useUserStore();

const { username, createdAt, avatar } = userStore.userInfo!;
const usedDays = dayjs().diff(dayjs(createdAt), 'day');
</script>
