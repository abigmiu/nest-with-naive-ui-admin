<template>
    <dir>
        <h2 class="font-bold text-lg mb-4">安全设置</h2>
        <NList>
            <NListItem>
                <div class="flex justify-between">
                    <NThing>
                        <template #header>账户密码</template>
                        <template #description>
                            <span class="text-gray-400">
                                定期修改密码更安全
                            </span>
                        </template>
                    </NThing>
                    <NButton text type="primary" @click="setUpdatePasswordVisible(true)">修改</NButton>
                </div>
            </NListItem>
        </NList>

        <UpdatePassword v-model="updatePasswordVisible"></UpdatePassword>
    </dir>
</template>
<script setup lang="ts">
import { NButton, NList, NListItem, NThing } from 'naive-ui';
import UpdatePassword from './UpdatePassword.vue';
import { useState } from '@/hooks/common';

const [updatePasswordVisible, setUpdatePasswordVisible] = useState(false);
</script>

<style lang="scss" scoped></style>