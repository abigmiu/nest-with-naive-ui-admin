<template>
  <NLayout class="layout" has-sider>

    <NLayoutSider class="layout-sider" :inverted="true">
      <LayoutMenu></LayoutMenu>
    </NLayoutSider>

    <NLayout>
      <NLayoutHeader>
        <LayoutHeader />
      </NLayoutHeader>
      <NLayoutContent class="layout-content layout-default-background" :native-scrollbar="false">
        <div class="layout-content-main">
          <LayoutContent></LayoutContent>
        </div>
      </NLayoutContent>
    </NLayout>


  </NLayout>
</template>

<script lang="ts" setup>
import { NLayout, NBackTop, NLayoutHeader, NDrawer, NMenu, NLayoutSider, NLayoutContent, NSplit } from 'naive-ui';
import LayoutMenu from './components/LayoutMenu.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutContent from './components/LayoutContent.vue';
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
<style lang="scss" scoped>
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
    height: calc(100vh - $layoutHeaderHeight);
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