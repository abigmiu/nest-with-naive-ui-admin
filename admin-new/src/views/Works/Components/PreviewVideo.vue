<template>
    <div class="relative">
        <div class="phone-mask">
            <img src="@/assets/images/phone.png" alt="">

        </div>
        <div class="player-wrapper" >
            <video
                v-if="uploadedUrl"
                :src="uploadedUrl"
                muted
                autoplay
                loop
            />
            <div v-else class="process text-white">
                上传中
                {{  process  }}
            </div>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import { useWorkStore } from '@/stores/workStore';
import { storeToRefs } from 'pinia';

const workStore = useWorkStore();
const { uploadedUrl, process } = storeToRefs(workStore);
</script>

<style lang="scss" scoped>
.phone-mask {
    background-color: black;
    pointer-events: none;
    height: 515px;
    width: 243px;
    img {
        width: 100%;
    }
}

.player-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    video {
        width: 100%;
    }
}
</style>