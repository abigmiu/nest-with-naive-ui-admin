<template>
    <div class="scroll-view-wrapper">
        <div class="relative" ref="scrollViewParentRef">
            <div class="scroll-view">
                <slot></slot>
            </div>
            <div class="footer">
                <slot name="footer">
                    <div class="flex justify-center my-2" v-if="loading">
                        <NIcon>
                            <LoadingOutlined class="animate-spin"></LoadingOutlined>
                        </NIcon>
                    </div>
                </slot>
            </div>
            <div class="footer-href" ref="footerHref"></div>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { NIcon } from 'naive-ui';
import { LoadingOutlined } from '@vicons/antd';

const props = defineProps<{
    loading: boolean
}>();
const emits = defineEmits<{
    reachBottom: []
}>();

const scrollViewParentRef = ref<HTMLDivElement | null>(null);
const footerHref = ref<HTMLDivElement | null>(null);
const observerFooterHref = () => {
    const io = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.intersectionRatio) {
            console.log('reachBootom');
            emits('reachBottom');
        }
    }, {
        // root: scrollViewParentRef.value!,
        // rootMargin: '-50px',
    });
    io.observe(footerHref.value!);
    onUnmounted(() => {
        io.disconnect();
    });
};
onMounted(observerFooterHref);

</script>

<style lang="scss" scoped>
.scroll-view-wrapper {
    height: 100%;
    overflow-y: auto;
}

.footer-href {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 10px;
    opacity: 0;
    // background-color: black;
    z-index: -1;
}
</style>