<template>
    <NLayoutHeader :inverted="headerDark">
        <div class="layout-header">
            <div class="layout-header__left">
                <!-- 菜单收起 -->
                <div class="ml-1 layout-header-trigger layout-header-trigger-min" @click="toggleCollapsed">
                    <NIcon size="18" v-if="collapsed">
                        <MenuUnfoldOutlined />
                    </NIcon>
                    <NIcon size="18" v-else>
                        <MenuFoldOutlined />
                    </NIcon>
                </div>
            </div>
            <div class="layout-header__right">
                <div class="layout-header-trigger layout-header-trigger-min" @click="toggleVisible">
                    <NTooltip placement="bottom-end">
                        <template #trigger>
                            <NIcon size="18">
                                <SettingOutlined></SettingOutlined>
                            </NIcon>
                        </template>
                        项目配置
                    </NTooltip>
                </div>
            </div>
        </div>
    </NLayoutHeader>

</template>
<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined } from '@vicons/antd';
import { ref } from 'vue';
import { NIcon, NTooltip, NLayoutHeader } from 'naive-ui';
import { useMenuStore } from '@/stores/menuStore';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/settingStore';

const menuStore = useMenuStore();
const settingStore = useSettingStore();
const { collapsed, } = storeToRefs(menuStore);
const { headerDark } = storeToRefs(settingStore);
const { toggleVisible } = settingStore;
const { toggleCollapsed } = menuStore;
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: $layoutHeaderHeight;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;

  &-left {
    display: flex;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      line-height: 64px;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;

      img {
        width: auto;
        height: 32px;
        margin-right: 10px;
      }

      .title {
        margin-bottom: 0;
      }
    }

    ::v-deep(.ant-breadcrumb span:last-child .link-text) {
      color: #515a6e;
    }

    .n-breadcrumb {
      display: inline-block;
    }

    &-menu {
      color: var(--text-color);
    }
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .avatar {
      display: flex;
      align-items: center;
      height: 64px;
    }

    >* {
      cursor: pointer;
    }
  }

  &-trigger {
    display: inline-block;
    width: 64px;
    height: 64px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      align-items: center;
      height: 64px;
      line-height: 64px;
    }

    &:hover {
      background: hsla(0, 0%, 100%, 0.08);
    }

    .anticon {
      font-size: 16px;
      color: #515a6e;
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }
}

.layout-header-light {
  background: #fff;
  color: #515a6e;

  .n-icon {
    color: #515a6e;
  }

  .layout-header-left {
    ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
      color: #515a6e;
    }
  }

  .layout-header-trigger {
    &:hover {
      background: #f8f8f9;
    }
  }
}

.layout-header-fix {
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  z-index: 11;
}

//::v-deep(.menu-router-link) {
//  color: #515a6e;
//
//  &:hover {
//    color: #1890ff;
//  }
//}</style>
