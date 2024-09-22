<template>
    <NLayoutHeader :inverted="headerDark">
        <div class="layout-header">
            <div class="layout-header__left">
                <!-- 菜单收起 -->
                <div class="ml-1 layout-header-trigger layout-header-trigger-min" @click="toggleAsideCollapsed">
                    <NIcon size="18" v-if="asideCollapsed">
                        <MenuUnfoldOutlined />
                    </NIcon>
                    <NIcon size="18" v-else>
                        <MenuFoldOutlined />
                    </NIcon>
                </div>
            </div>
            <div class="layout-header__right flex items-center">
                <div class="layout-header-trigger layout-header-trigger-min" @click="toggleSettingVisible">
                    <NTooltip placement="bottom-end">
                        <template #trigger>
                            <NIcon size="18">
                                <SettingOutlined></SettingOutlined>
                            </NIcon>
                        </template>
                        项目配置
                    </NTooltip>
                </div>
                <div class="layout-header-trigger-min cursor-pointer">
                    <NDropdown :options="avatarDropdownOptions" :on-select="onAvatarDropdownSelect">
                        <NAvatar :src="avatarLink"></NAvatar>
                    </NDropdown>
                </div>
            </div>
        </div>
    </NLayoutHeader>

</template>
<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined } from '@vicons/antd';
import { computed, ref } from 'vue';
import { NIcon, NTooltip, NLayoutHeader, NAvatar, NDropdown, type DropdownOption, type DropdownProps, useDialog } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/settingStore';
import { useUserStore } from '@/stores/userStore';
import { reqLogout } from '@/api/auth';
import { useRouter } from 'vue-router';
import { loginRouteConstant, userRouteConstant } from '@/router/constant';
import { dialog } from '@/utils/global';

const router = useRouter();

const settingStore = useSettingStore();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { headerDark, asideCollapsed } = storeToRefs(settingStore);
const { toggleAsideCollapsed, toggleSettingVisible } = settingStore;
const avatarLink = computed(() => {
  return userInfo.value?.avatar ?? '';
});
const avatarDropdownOptions: DropdownOption[] = [
  { label: '个人资料', key: 'profile', action: () => onUserProfile() },
  { label: '退出登录', key: 'logout', action: () => onConfirmLogout() }
];
const onAvatarDropdownSelect: DropdownProps['onSelect'] = (key, option) => {
  if (option.action) {
    (option.action as Function)();
  }
};

/** 确认退出 */
const onConfirmLogout = () => {
  const d = dialog.warning({
    title: '提示',
    content: '确认退出登录',
    positiveText: '退出',
    onPositiveClick: async () => {
      d.loading = true;
      try {
        await reqLogout();
        userStore.clearUserInfo();
        await router.replace({
          name: loginRouteConstant.index.name,
        });
        return true;
      } catch {
        return false;
      } finally {
        d.loading = false;
      }
    }
  });
};

const onUserProfile = () => {
  router.push({
    name: userRouteConstant.index.name
  });
};

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
</style>