import { fileURLToPath, URL } from 'node:url';

import { CommonServerOptions, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from "rollup-plugin-visualizer";

/** env 配置的代理变vite的proxy参数 */
function createProxy(envValue: string): CommonServerOptions['proxy'] {
  let proxies: Array<{
    suffix: string;
    target: string;
  }> = [];
  try {
    proxies = JSON.parse(envValue);
  } catch(e) {
    throw new Error(`createProxy失败 ${e}`);
  }

  const retProxy: CommonServerOptions['proxy'] = {};

  proxies.forEach((proxyItem) => {
    retProxy[proxyItem['suffix']] = {
      target: proxyItem.target,
      changeOrigin: true,
    };
  });

  return retProxy;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_DEV_PORT, VITE_PROXY } = env;
  return {
    server: {
      port: Number(VITE_DEV_PORT),
      // proxy: createProxy(VITE_PROXY),
      proxy: {
        '/api': 'http://localhost:3000',
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: "test.html", //分析图生成的文件名
        open:true //如果存在本地服务端口，将在打包后自动展示
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/_variable.scss";`
        }
      }
    }
  };

});
