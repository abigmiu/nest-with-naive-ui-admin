<template>
    <NCard>
        <NUpload
            v-model:file-list="fileList"
            accept="image/*"
            :disabled="fileList.length > 0"
            @change="onChange"
            :custom-request="customRequest"
            list-type="image"
        >
            <NUploadDragger>
                <div style="margin-bottom: 12px">
                    <NIcon size="48" :depth="3">
                        <ArchiveIcon />
                    </NIcon>
                </div>
                <n-text style="font-size: 16px">
                    点击或者拖动文件到该区域来上传
                </n-text>
            </NUploadDragger>
        </NUpload>

        <BasicForm
            class="mt-5"
            :col="1"
            :schemas="formSchemas"
            ref="basicFormRef"
        >
            <template #tags>
                <NDynamicTags v-model:value="tags" />
            </template>
        </BasicForm>

        <div class="flex justify-end">
            <NButton @click="onClear" class="mr-2">重置</NButton>
            <NButton @click="onSubmit" type="primary">提交</NButton>
        </div>
    </NCard>
</template>
<script setup lang="ts">
import { NUpload, NUploadDragger, NIcon, NText, NCard, NDynamicTags, type UploadFileInfo, type UploadProps, NButton } from 'naive-ui';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';
import BasicForm, { type IBasicFormSchemas } from '@/components/form/BasicForm.vue';
import { ref } from 'vue';
import { reqFileRecord, reqFileUpload, type IReqFileRecordRequest } from '@/api/file';
import { getBasicForm } from '@/hooks/basicComponent';

const formSchemas: IBasicFormSchemas[] = [
    { field: 'fileName', label: '文件名', type: 'input' },
    { field: 'remark', label: '备注', type: 'input' },
    { field: 'tags', label: '标签', type: 'slot' },
];

const tags = ref<string[]>([]);

const basicFormRef = ref<null | InstanceType<typeof BasicForm>>(null);
const fileList = ref<UploadFileInfo[]>([]);
const onChange: UploadProps['onChange'] = ({ file }) => {
    const formData = basicFormRef.value!.formData;
    formData.fileName = file.name;
};

const customRequest: UploadProps['customRequest'] = async ({ file, onProgress, onFinish, onError }) => {
    try {
        if (!file.file) return;
        const { id, url } = await reqFileUpload(file.file, {
            onUploadProgress({ progress }) {
                onProgress({ percent: (progress || 0) * 100 });
            },
        });
        file.url = url;
        const formData = getBasicForm(basicFormRef).formData as IReqFileRecordRequest;
        formData.fileId = id;
        onFinish();
    } catch {
        onError();
    }
};

const onSubmit = async () => {
    const formData = getBasicForm(basicFormRef).formData as IReqFileRecordRequest;
    formData.tags = tags.value;
    try {
        await reqFileRecord(formData);
    } catch {

    }
};
const onClear = () => {
    getBasicForm(basicFormRef).resetForm();
    fileList.value = [];
    tags.value = [];
};

</script>