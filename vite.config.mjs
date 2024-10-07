import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [preact(), reactRefresh()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  optimizeDeps: {
    include: ['preact/hooks', 'preact/jsx-runtime', 'three', 'three/addons/libs/stats.module.js', 'three/addons/objects/Sky.js']
  }
});
