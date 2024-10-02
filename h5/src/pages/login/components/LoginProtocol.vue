<template>
    <div class="protocol" :class="showAnim ? 'anim-bounce' : ''">
        <Tooltip style="top: -100%; left: -10rem" v-model="showTooltip" />
        <div class="left">
          <Check v-model="isAgree" />
        </div>
        <div class="right">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Tooltip from './Tooltip.vue'
import Check from '@/components/Check.vue';

const showAnim = ref(false);
const isAgree = ref(false);
const showTooltip = ref(false);

const verify = () => {
    if (isAgree.value) {
        return true;
    }

    if (!showAnim.value && !showTooltip.value) {
        showAnim.value = true;
        setTimeout(() => {
            showAnim.value = false;
            showTooltip.value = true;
        }, 500);
        setTimeout(() => {
            showTooltip.value = false;
        }, 3000)
    }

    return false;
}

defineExpose({
    verify,
})
</script>

<style scoped lang="less">
.protocol {
    position: relative;
    color: gray;
    margin-top: 20rem;
    font-size: 12rem;
    display: flex;
    margin-bottom: 20rem;

    .left {
        padding-top: 1rem;
        margin-right: 5rem;
    }
}
</style>