<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useNestComponents } from './hooks/component';
import { NButton, NConfigProvider, NDialogProvider, NMessageProvider, NNotificationProvider, zhCN, type ConfigProviderProps, type GlobalThemeOverrides } from 'naive-ui';
import { computed, ref } from 'vue';
import { useSettingStore } from './stores/settingStore';
import { storeToRefs } from 'pinia';
import { lighten } from './utils/common';
const settingStore = useSettingStore();
const { themeColor } = storeToRefs(settingStore);

const a = ref(1);
setInterval(() => {
  a.value++;
}, 1000);

const themeOverrides = computed<GlobalThemeOverrides>(() => {
  const lightenStr = lighten(themeColor.value, 6);
  return {
    common: {
      primaryColor: themeColor.value,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
      primaryColorSuppl: themeColor.value
    },
    LoadingBar: {
      colorLoading: themeColor.value
    }
  };
});

</script>

<template>
    <NConfigProvider :locale="zhCN" :theme-overrides="themeOverrides">
        <NMessageProvider>

            <NDialogProvider>
                <NNotificationProvider>
                    <RouterView>
                    </RouterView>
                </NNotificationProvider>
            </NDialogProvider>
        </NMessageProvider>
    </NConfigProvider>


</template>
