<script setup lang="ts">
import { RouterView } from 'vue-router';

import {  NConfigProvider } from 'naive-ui';
import { useNaiveUIConfig } from './utils/global';

const naiveUiConfig = useNaiveUIConfig();




</script>

<template>
    <NConfigProvider :locale="naiveUiConfig.locale" :theme-overrides="naiveUiConfig.themeOverrides">
        <RouterView></RouterView>
    </NConfigProvider>
</template>
