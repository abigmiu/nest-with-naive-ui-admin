<template>
    <NLayout class="layout" has-sider>
        <LayoutMenu></LayoutMenu>
        <NLayout>
            <LayoutHeader />
          
            <LayoutTabs class="layout-default-background"></LayoutTabs>
            
                
            <NLayoutContent class="layout-content layout-default-background" :native-scrollbar="false">
                
                <div class="layout-content-main">
                    <LayoutContent></LayoutContent>
                </div>
            </NLayoutContent>
         
            
           
        </NLayout>
    </NLayout>
    <LayoutSetting></LayoutSetting>
    <NWatermark
        v-if="config.watermark"
        cross
        fullscreen
        :content="watermarkContent"
        :x-offset="12"
        :y-offset="60"
        :width="384"
        :height="384"
        :rotate="-15"
    ></NWatermark>
</template>

<script lang="ts" setup>
import { NLayout,  NLayoutContent, NLayoutHeader, NWatermark } from 'naive-ui';
import LayoutMenu from './components/LayoutMenu.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutContent from './components/LayoutContent.vue';
import LayoutTabs from './components/LayoutTabs.vue';
import LayoutSetting from './components/LayoutSetting.vue';
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { useSystemSettingStore } from '@/stores/systemSettingStore';

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const watermarkContent = computed(() => {
  if (!userInfo.value) return '';
  return `${userInfo.value.username}`;
});

const systemSettingStore = useSystemSettingStore();
const { config } = storeToRefs(systemSettingStore);

systemSettingStore.getList();

</script>

<style lang="scss">
.layout-side-drawer {
  background-color: rgb(0, 20, 40);

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }
}
</style>
<style lang="scss">
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;

  &-default-background {
    background: #f5f7f9;
  }

  .layout-sider {
    height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    transition: all 0.2s ease-in-out;
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    flex: auto;
    height: calc(100vh - $layoutHeaderHeight - $layoutTabsHeight);
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  .n-layout-footer {
    background: none;
  }
}

.layout-content-main {
  margin: 0 10px 10px;
}

.layout-content-main-fix {
  padding-top: 64px;
}

.fluid-header {
  padding-top: 0;
}

.main-view-fix {
  padding-top: 44px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>