<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useNestComponents } from './hooks/component';
import { NConfigProvider, NMessageProvider, NNotificationProvider, zhCN, type ConfigProviderProps } from 'naive-ui';

const AppProvider = useNestComponents([
  {
    component: NConfigProvider,
    props: {
      locale: zhCN,
    } as ConfigProviderProps
  },
  {
    component: NMessageProvider,
  },
  {
    component: NNotificationProvider
  }
])


</script>

<template>
  <AppProvider>
    <RouterView>

    </RouterView>
  </AppProvider>
</template>
