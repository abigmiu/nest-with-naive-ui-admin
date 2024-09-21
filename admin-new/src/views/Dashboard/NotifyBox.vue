<template>
    
    <NSpace vertical :size="12" v-if="listData.length">
        <NAlert
            :title="item.title || '通知'"
            type="info"
            v-for="item in listData"
            :key="item.id"
        >{{ item.content }}</NAlert>
    </NSpace>
    <NEmpty v-else></NEmpty>
</template>
<script setup lang="ts">
import { reqPublishNotify, type INotifyBase } from '@/api/notify';
import { NAlert, NSpace, NEmpty } from 'naive-ui';
import { onMounted, ref } from 'vue';

const listData = ref< INotifyBase[]>([]);
onMounted(async () => {
    const res = await reqPublishNotify();
    listData.value = res;
});
</script>