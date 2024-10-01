<template>
    <NCard :bordered="false" rounded>
        <div class="flex wrapper">
            <div class="flex-1 left">
                <WorkDesc></WorkDesc>
                <NButton @click="onSubmit" :disabled="submitDisabled">保存</NButton>
            </div>
            <div class="right">
                <PreviewVideo></PreviewVideo>
            </div>
        </div>

    </NCard>
</template>
<script setup lang="ts">
import { NCard, NButton } from 'naive-ui';
import PreviewVideo from './Components/PreviewVideo.vue';
import WorkDesc from './Components/WorkDesc.vue';
import { useWorkStore } from '@/stores/workStore';
import { reqCreateVideo } from '@/api/user-video';
import { useState } from '@/hooks/common';
import { message } from '@/utils/global';
import { ref } from 'vue';

const workStore = useWorkStore();

const [submitLoading, setSubmitLoading] = useState(false);
const submitDisabled = ref(false);

const onSubmit = async () => {
    if (submitLoading.value) return;
    try {
        setSubmitLoading(true);
        await reqCreateVideo({
            title: workStore.title,
            desc: workStore.desc,
            videoUrl: workStore.uploadedUrl,
        });
        message.success("上传成功");
        workStore.clearData();
        submitDisabled.value = true;
    } finally {
        setSubmitLoading(false);
    }

};
</script>
<style lang="scss" scoped>
.wrapper {
    max-width: 800px;
    margin: 0 auto;
}

.left {
    width: 0;
    margin-right: 50px;
}
</style>