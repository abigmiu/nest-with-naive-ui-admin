<template>
    <div>
        <div class="list">
            <NCard v-for="item in imgList" :key="item.id">
                <template #cover>
                    <NImage :src="item.url" lazy></NImage>
                </template> 
                <div class="tags" v-if="item.tags.length">
                    <NTag v-for="item in item.tags" :key="item"></NTag>
                </div>
                <div class="remark" v-if="item.remark"> {{ item.remark }}</div>
            </NCard>
        </div>
    </div>
</template>
<script setup lang="ts">
import { contentRouteConstant } from '@/router/modules/content';
import { NCard, NImage, NTag, } from 'naive-ui';
import { ref } from 'vue';

defineOptions({
    name: contentRouteConstant.image.name
});


const imgList = ref([]);
</script>