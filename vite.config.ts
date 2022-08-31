import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import electron, { onstart } from 'vite-plugin-electron'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style/mixins.scss";`,
      },
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      dts: './src/type/auto-import.d.ts',
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      dts: './src/type/vue-components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            sourcemap: true,
            outDir: 'dist/electron/main',
          },
          plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
        },
      },
      preload: {
        input: path.resolve(__dirname, 'electron/preload/index.ts'),
        vite: {
          build: {
            sourcemap: true,
            outDir: 'dist/electron/preload',
          },
        },
      },
      renderer: {},
    }),
  ],
  build: {
    emptyOutDir: false, //  默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
  },
})
