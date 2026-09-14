import { cpSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const staticAssets = ['图片', '视频', 'RH主页', 'MODELS.png', 'TOOLS.png'];

function copyPortfolioAssets() {
  return {
    name: 'copy-portfolio-assets',
    closeBundle() {
      staticAssets.forEach(asset => {
        const source = resolve(asset);
        if (existsSync(source)) cpSync(source, resolve('dist', asset), { recursive: true });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), copyPortfolioAssets()]
});
