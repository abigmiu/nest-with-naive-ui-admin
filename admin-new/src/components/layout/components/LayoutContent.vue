<template>
    <RouterView v-slot="{ Component, route }">
        <KeepAlive>
            <component
                :is="Component"
                :key="route.fullPath"
            ></component>
        </KeepAlive>
    </RouterView>
</template>
<script setup lang="ts">

</script>