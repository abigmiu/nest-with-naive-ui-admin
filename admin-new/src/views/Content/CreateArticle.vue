<template>
    <NCard>
        <NForm :model="formData" :rules="formRules" ref="formRef">
            <NFormItem label="文章标题" path="title">
                <NInput v-model:value="formData.title"></NInput>
            </NFormItem>
            <NFormItem label="文章内容" path="content">
                <div class="w-full">
                    <QuillEditor ref="editorRef"></QuillEditor>
                </div>
            </NFormItem>
            <NFormItem>
                <NButton type="primary" @click="onSubmit">提交</NButton>
            </NFormItem>
        </NForm>
    </NCard>
</template>
<script setup lang="ts">
import { httpArticleCreateReq } from '@/api/article';
import QuillEditor from '@/components/common/QuillEditor.vue';
import { contentRouteConstant } from '@/router/modules/content';

import { NButton, NCard, NForm, NFormItem, NInput, type FormRules } from 'naive-ui';
import 'quill/dist/quill.snow.css';
import { reactive, ref } from 'vue';

defineOptions({
    name: contentRouteConstant.articleCreate.name
});

const formData = reactive({
    title: '',
    content: ''
});

const formRules: FormRules = {
    title: [
        { required: true, message: '请输入文章标题' }
    ],
    content: [
        {
            required: true, message: '请输入文章内容', validator() {
                return editorRef.value!.getQuill().getText().trim().length > 0;
            }
        }
    ]

};



const formRef = ref<InstanceType<typeof NForm> | null>(null);
const editorRef = ref<InstanceType<typeof QuillEditor> | null>(null);

async function onSubmit() {
    const content = editorRef.value!.getQuill().getText();
    formData.content = content;
    await formRef.value!.validate();
    await httpArticleCreateReq(formData);
}

</script>