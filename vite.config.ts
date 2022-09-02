// import { rmSync } from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron, { onstart } from 'vite-plugin-electron'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import autoimport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import compression from 'vite-plugin-compression'
import pkg from './package.json'

// rmSync('dist', { recursive: true, force: true }) // v14.14.0

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
    vue(),
    autoimport({
      dts: './src/type/auto-import.d.ts',
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    components({
      dts: './src/type/vue-componets.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    compression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            // For Debug
            sourcemap: true,
            outDir: 'dist/electron/main',
          },
          // Will start Electron via VSCode Debug
          plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
        },
      },
      preload: {
        input: {
          // You can configure multiple preload here
          index: path.join(__dirname, 'electron/preload/index.ts'),
        },
        vite: {
          build: {
            // For Debug
            sourcemap: 'inline',
            outDir: 'dist/electron/preload',
          },
        },
      },
      // Enables use of Node.js API in the Renderer-process
      // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
      renderer: {},
    }),
  ],
  server: process.env.VSCODE_DEBUG
    ? {
        host: pkg.debug.env.VITE_DEV_SERVER_HOSTNAME,
        port: pkg.debug.env.VITE_DEV_SERVER_PORT,
      }
    : undefined,
  esbuild: {
    pure: ['console.log'],
  },
  build: {
    minify: true,
    assetsDir: '',
  },
})
