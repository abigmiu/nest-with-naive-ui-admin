<template>
    <NCard>
        <NForm :model="formData" :rule="formRules" ref="formRef">
            <NFormItem label="文章标题" path="title">
                <NInput v-model:value="formData.title"></NInput>
            </NFormItem>
            <NFormItem label="文章内容" path="content">
                <div class="w-full">
                    <div id="editor" style="height: 600px;"></div>
                </div>
            </NFormItem>
            <NFormItem>
                <NButton type="primary" @click="onSubmit">提交</NButton>
            </NFormItem>
        </NForm>
    </NCard>
</template>
<script setup lang="ts">
import { reqArticleRequest } from '@/api/article';
import { NButton, NCard, NForm, NFormItem, NInput, type FormRules } from 'naive-ui';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { onMounted, reactive, ref } from 'vue';

const formData = reactive({
    title: '',
    content: ''
});

const formRules: FormRules = {
    title: [
        { required: true, message: '请输入文章标题' }
    ],
    content: {
        required: true, message: '请输入文章内容'
    }
};

let quill: Quill;
onMounted(() => {
    quill = new Quill('#editor', {
        theme: 'snow'
    });
});

const formRef = ref<InstanceType<typeof NForm> | null>(null);

async function onSubmit() {
    const content = quill.getText();
    formData.content = content;
    await formRef.value!.validate();
    await reqArticleRequest(formData);
}

</script>