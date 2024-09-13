<template>
    <div id="quill-toolbar"></div>
    <QuillToolbar :quill="quill" v-if="false"></QuillToolbar>
    <div id="editor" style="height: 600px;"></div>
</template>
<script setup lang="ts">
import { QUILL_TOOLBAR_ACTIONS } from '@/utils/constant';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { onMounted } from 'vue';
import QuillToolbar from './QuillToolbar.vue';


let quill: Quill;
onMounted(() => {
    quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: '请输入内容',
        modules: {
            // toolbar: '#quill-fake-toolbar',
            toolbar: QUILL_TOOLBAR_ACTIONS
        }
    });
});

const getQuill = () => quill;

defineExpose({
    getQuill,
});


</script>