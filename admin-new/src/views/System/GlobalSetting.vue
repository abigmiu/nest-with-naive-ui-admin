<template>
    <NCard>
        <h2 class="font-bold text-lg mb-4">全局设置</h2>

        <NList>
            <NListItem>
                <NThing>
                    <template #header>全局水印</template>
                    <NSwitch v-model:value="systemSetting.watermark">
                        <template #checked>开启</template>
                        <template #unchecked>关闭</template>
                    </NSwitch>
                </NThing>
            </NListItem>
            <NListItem>
                <NButton type="primary" @click="onSave" :loading="saveLoading">保存</NButton>
            </NListItem>
        </NList>

    </NCard>
</template>
<script setup lang="ts">
import { reqSystemSettingGroupUpdate, type ISystemSettingUpdate } from '@/api/setting';
import { useState } from '@/hooks/common';
import { useSystemSettingStore } from '@/stores/systemSettingStore';
import { dialog } from '@/utils/global';
import { cloneDeep } from 'es-toolkit';
import { NCard, NList, NListItem, NThing, NSwitch, NButton, useMessage } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const message = useMessage();

const systemSettingStore = useSystemSettingStore();
const loading = ref(false);
let saved = false;

const systemSetting = ref(cloneDeep(systemSettingStore.config));
let originSetting: typeof systemSettingStore.config;
onMounted(() => {
    systemSettingStore.getList()
        .then(() => {
            systemSetting.value = cloneDeep(systemSettingStore.config);
            originSetting = cloneDeep(systemSettingStore.config);
        })
        .finally(() => {
            loading.value = false;
        });
});

const [saveLoading, setSaveLoading] = useState(false);
const onSave = async () => {
    setSaveLoading(true);
    try {
        const modifiedData: ISystemSettingUpdate[] = Object.keys(originSetting).filter((key) => {
            // @ts-ignore
            return JSON.stringify(originSetting[key]) !== JSON.stringify(systemSetting.value[key]);
        }).map(key => {
            return {
                filed: key,
                // @ts-ignore
                value: systemSetting.value[key],
            };
        });
        await reqSystemSettingGroupUpdate(modifiedData);
        modifiedData.forEach((item) => {
            // @ts-ignore
            systemSettingStore.config[item.filed] = item.value;
        });
        message.success('保存成功');
    } finally {
        setSaveLoading(false);
    }
};

onBeforeRouteLeave(async (to, from, next) => {
    if (!originSetting || saved) {
        next();
    } else {
        const hasModify = Object.keys(originSetting).some((key) => {
            // @ts-ignore
            return JSON.stringify(originSetting[key]) !== JSON.stringify(systemSetting.value[key]);
        });

        if (!hasModify) {
            next();
        } else {
            return new Promise((resolve, reject) => {
                dialog.warning({
                    title: '提示',
                    content: '修改内容未保存，是否离开',
                    positiveText: '离开',
                    negativeText: '留在当前页面',
                    maskClosable: false,
                    onPositiveClick: () => {
                        next();
                        resolve();
                    },
                    onNegativeClick(e) {
                        next(false);
                    },

                });
            });

        }
    }
});

</script>