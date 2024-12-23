import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), svgr()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@styles': path.resolve(__dirname, './src/assets/styles'),
        '@mixin': path.resolve(__dirname, './src/assets/styles/mixin'),
        '@icons': path.resolve(__dirname, './src/assets/images/icons'),
        '@images': path.resolve(__dirname, './src/assets/images'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@api': path.resolve(__dirname, './src/api'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
