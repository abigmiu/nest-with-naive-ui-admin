<script setup lang="ts">
import { RouterView } from 'vue-router';

import { NLoadingBarProvider, NConfigProvider, NDialogProvider, NMessageProvider, NNotificationProvider, zhCN, type ConfigProviderProps, type GlobalThemeOverrides, useLoadingBar } from 'naive-ui';
import { useNaiveUIConfig } from './utils/global';

const naiveUiConfig = useNaiveUIConfig();




</script>

<template>
    <NConfigProvider :locale="naiveUiConfig.locale" :theme-overrides="naiveUiConfig.themeOverrides">
        <RouterView></RouterView>
    </NConfigProvider>
</template>
