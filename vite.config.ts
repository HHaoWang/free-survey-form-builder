import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import dtsPlugin from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'vue',
        'dayjs',
        'free-survey-core',
        'lodash',
        'mitt',
        'tdesign-icons-vue-next',
        'tdesign-vue-next',
        'vuedraggable'
      ],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          preserveModulesRoot: 'packages',
          preserveModules: true
        },
        {
          format: 'cjs',
          dir: 'dist/lib',
          entryFileNames: '[name].js',
          preserveModulesRoot: 'packages',
          preserveModules: true,
          exports: 'named'
        }
      ]
    },
    lib: {
      entry: resolve(__dirname, 'packages/index.ts')
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    dtsPlugin({
      entryRoot: 'packages',
      outDir: ['dist/es', 'dist/lib'],
      tsconfigPath: resolve(__dirname, 'tsconfig.lib.json')
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
