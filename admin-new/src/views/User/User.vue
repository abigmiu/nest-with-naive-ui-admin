<template>
    <NCard >
        <div style="min-height: 500px;">
            <NTabs animated placement="left">
                <NTabPane name="profile" tab="基础资料">
                    <UserProfile></UserProfile>
                </NTabPane>
                <NTabPane name="security" tab="安全设置">
                    <SecuritySetting></SecuritySetting>
                </NTabPane>
            </NTabs>
        </div>
        
    </NCard>
</template>
<script setup lang="ts">
import { NTabs, NTabPane, NCard } from 'naive-ui';
import UserProfile from './components/UserProfile.vue';
import SecuritySetting from './components/SecuritySetting.vue';
</script>