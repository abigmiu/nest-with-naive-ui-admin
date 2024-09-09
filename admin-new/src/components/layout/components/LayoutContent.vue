<template>
    <RouterView v-slot="{ Component, route }">
        <KeepAlive :include="keepAliveCmps">
            <Transition :name="getAnimation" mode="out-in" appear>
                <component :is="Component" :key="route.fullPath"></component>
            </Transition>
        </KeepAlive>
    </RouterView>
</template>
<script setup lang="ts">
import { useAliveStore } from '@/stores/aliveStore';
import { useSettingStore } from '@/stores/settingStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const keepStore = useAliveStore();
const keepAliveCmps = computed(() => keepStore.keepComps);

const settingStore = useSettingStore();
const { animationName, enableAnimation } = storeToRefs(settingStore);
const getAnimation = computed(() => {
    return enableAnimation.value ? animationName.value : '';
});
</script>