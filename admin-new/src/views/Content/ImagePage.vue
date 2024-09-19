<template>
    <div>
        <div class="list">
            <NGrid x-gap="12" y-gap="12" :cols="4">
                <NGi v-for="item in imgList" :key="item.id">
                    <NCard class="file-record">
                        <template #cover>
                            <NImage :src="item.file.url" lazy object-fit="cover"></NImage>
                        </template>
                        <div class="title">{{ item.file.fileName }}</div>
                        <div class="remark" v-if="item.remark"> {{ item.remark }}</div>
                        <div class="tags" v-if="item.tags.length">
                            <NTag v-for="tag in item.tags" :key="tag">{{ tag }}</NTag>
                        </div>
                    </NCard>
                </NGi>
            </NGrid>

        </div>
    </div>
</template>
<script setup lang="ts">
import { reqFileRecordPage, type IReqFileRecordPageResponse } from '@/api/file';
import { contentRouteConstant } from '@/router/constant';
import { NCard, NGrid, NImage, NTag, NGi } from 'naive-ui';
import { onMounted, ref } from 'vue';

defineOptions({
    name: contentRouteConstant.image.name
});


const imgList = ref<IReqFileRecordPageResponse[]>([]);

const getImgList = async () => {
    const res = await reqFileRecordPage();
    imgList.value = res.list;
};

onMounted(getImgList);
</script>

<style lang="scss">
.file-record {
    .n-card-cover {
        
        height: 320px;
    }

}
</style>