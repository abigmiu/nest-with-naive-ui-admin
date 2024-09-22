import { createDiscreteApi, zhCN, } from "naive-ui";
import type { ConfigProviderProps } from 'naive-ui';
import { computed, } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingStoreOutside } from "@/stores/settingStore";
import { lighten } from "./common";
import { createSharedComposable } from "@vueuse/core";

/** naive-ui 全局配置 */
export const useNaiveUIConfig = createSharedComposable(() => {
    const settingStore = useSettingStoreOutside();
    const { themeColor } = storeToRefs(settingStore);
    const configProviderProps = computed<ConfigProviderProps>(() => {
        const lightenStr = lighten(themeColor.value, 6);
        return {
            locale: zhCN,
            themeOverrides: {
                common: {
                    primaryColor: themeColor.value,
                    primaryColorHover: lightenStr,
                    primaryColorPressed: lightenStr,
                    primaryColorSuppl: themeColor.value
                },
                LoadingBar: {
                    colorLoading: themeColor.value
                }
            }
        };
    });

    return configProviderProps;
});

const { message, dialog, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'loadingBar'],
    {
        configProviderProps: useNaiveUIConfig(),
    }
);

export {
    message,
    dialog,
    loadingBar
};