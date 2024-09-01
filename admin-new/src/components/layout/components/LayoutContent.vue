<template>
    <RouterView v-slot="{ Component, route }">
        <KeepAlive :include="keepAliveCmps">
            <component
                :is="Component"
                :key="route.fullPath"
            ></component>
        </KeepAlive>
    </RouterView>
</template>
<script setup lang="ts">
import { useAliveStore } from '@/stores/aliveStore';
import { computed } from 'vue';

const keepStore = useAliveStore();
const keepAliveCmps = computed(() => keepStore.keepComps);
</script>