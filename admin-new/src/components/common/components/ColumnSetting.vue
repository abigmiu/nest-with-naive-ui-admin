<template>
    <NTooltip trigger="hover" placement="top">
        <template #trigger>
            <NPopover trigger="click" placement="bottom-end">
                <template #trigger>
                    <NIcon>
                        <SettingOutlined />
                    </NIcon>
                </template>
                <template #header>
                    <NSpace>
                        <NButton text type="primary">重置</NButton>
                        <NCheckbox v-model:checked="setting.striped">
                            表格斑马条纹
                        </NCheckbox>
                    </NSpace>
                </template>

            </NPopover>
        </template>
        <span>表格设置</span>
    </NTooltip>
</template>
<script setup lang="ts">
import { NTooltip, NPopover, NIcon, NSpace, NSwitch, NButton, NCheckbox } from 'naive-ui';
import { SettingOutlined } from '@vicons/antd';
import { reactive } from 'vue';

const setting = reactive({
    striped: false,
})
</script>