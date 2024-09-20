<template>
    <NUpload
        ref="uploadRef"
        :custom-request="customRequest"
        accept="image/*"
        :show-file-list="false"
    >
        <slot></slot>
    </NUpload>
</template>
<script setup lang="ts">
import { reqFileUpload } from '@/api/file';
import { NUpload, type UploadProps } from 'naive-ui';
import { ref } from 'vue';

interface IEmits {
    (e: 'uploaded', url: string): void
}
const emits = defineEmits<IEmits>();

const uploadRef = ref<InstanceType<typeof NUpload> | null>(null);
    
const customRequest: UploadProps['customRequest'] = async ({ file, onProgress, onFinish, onError }) => {
    try {
        if (!file.file) return;
        const { id, url } = await reqFileUpload(file.file, {
            onUploadProgress({ progress }) {
                onProgress({ percent: (progress || 0) * 100 });
            },
        });
        
        emits('uploaded', url);
        onFinish();
        uploadRef.value!.clear();
    } catch {
        onError();
    }
};
</script>