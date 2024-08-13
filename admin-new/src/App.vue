<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useNestComponents } from './hooks/component';
import { NConfigProvider, NMessageProvider, NNotificationProvider } from 'naive-ui';

const AppProvider = useNestComponents([
  {
    component: NConfigProvider,
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
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component"></component>
      </KeepAlive>
    </RouterView>
  </AppProvider>
</template>
