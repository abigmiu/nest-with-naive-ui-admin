<template>
    <NCard>
        <NButton type="primary" @click="onCreateBtn">新增</NButton>
        <div class="list mt-2">
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
    </NCard>
</template>
<script setup lang="ts">
import { reqFileRecordPage, type IReqFileRecordPageResponse } from '@/api/file';
import { contentRouteConstant } from '@/router/constant';
import { NCard, NGrid, NImage, NTag, NGi, NButton } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
    name: contentRouteConstant.image.name
});


const imgList = ref<IReqFileRecordPageResponse[]>([]);

const getImgList = async () => {
    const res = await reqFileRecordPage();
    imgList.value = res.list;
};

onMounted(getImgList);

const router = useRouter();
const onCreateBtn = () => {
    router.push({
        name: contentRouteConstant.imageCreate.name,
    });
};
</script>

<style lang="scss">
.file-record {
    .n-card-cover {
        
        height: 320px;
    }

}
</style>