<template>
    <NCard>
        <NButton type="primary" @click="onCreateBtn">新增</NButton>
        <div class="list mt-2">
            <NGrid x-gap="12" y-gap="12" :cols="6">
                <NGi v-for="item in imgList" :key="item.id">
                    <NCard class="file-record">
                        <template #cover>
                            <div class="h-full relative">
                                <NImage :src="item.file.url" lazy object-fit="cover"></NImage>
                                <div class="remark" v-if="item.remark"> {{ item.remark }}</div>
                            </div>
                        </template>
                        <div class="title" line-clamp-2>{{ item.file.fileName }}</div>

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
$remark-lineheight: 20px;

.file-record {
    height: 100%;

    .n-card-cover {
        height: 320px;
    }

    .title {
        margin-top: 10px;
        font-size: 16px;
        font-weight: bold;
        word-break: break-all;
    }

    .remark {
        line-height: $remark-lineheight;
        height: 2 * $remark-lineheight;
        min-height: 2 * $remark-lineheight;
        max-height: 2 * $remark-lineheight;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($color: #000000, $alpha: 0.5);
        color: white;
        padding: 0 5px;
        transition: max-height 0.5s ease-out;

        &:hover {
            height: fit-content;
            max-height: 200px;
        }
    }

}
</style>