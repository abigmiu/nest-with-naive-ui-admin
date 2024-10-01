<template>
    <NCard :bordered="false" round title="发布视频">
        <NUpload
            v-model:file-list="fileList"
            accept="video/mp4"
            :disabled="fileList.length > 0"
            @change="onChange"
        >
            <NUploadDragger>
                <div class="py-20">
                    <div style="margin-bottom: 12px">
                        <NIcon size="48" :depth="3">
                            <ArchiveIcon />
                        </NIcon>
                    </div>
                    <div>
                        <n-text style="font-size: 22px">
                            点击上传 或直接将视频文件拖入此区域
                        </n-text>
                    </div>

                    <div class="mt-2">
                        <n-text>为了更好的观看体验和平台安全，平台将对上传的视频预审。超过40秒的视频建议上传横版视频</n-text>
                    </div>
                </div>
            </NUploadDragger>
        </NUpload>
    </NCard>
</template>
<script setup lang="ts">
import { NUpload, NUploadDragger, NIcon, NText, NCard, NDynamicTags, type UploadFileInfo, type UploadProps, NButton } from 'naive-ui';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';
import { ref } from 'vue';
import { useWorkStore } from '@/stores/workStore';
import { useRouter } from 'vue-router';
import { worksRouteConstant } from '@/router/constant';
import { userContentRouteConstant } from '@/router/userConstant';

const workStore = useWorkStore();
const router = useRouter();

const fileList = ref<UploadFileInfo[]>([]);
const onChange: UploadProps['onChange'] = async ({ file }) => {
    workStore.file = file.file;
    workStore.updateFile();
    const err = await router.push({
        name: userContentRouteConstant.publishVideo.name
    });
    console.log("🚀 ~ constonChange:UploadProps['onChange']= ~ err:", err);
};
</script>