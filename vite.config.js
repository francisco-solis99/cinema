import { defineConfig } from 'vite';

// import path from 'path';
// const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
// const base = mode === 'production' ? '/' + path.basename(process.cwd()) + '/' : '/';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    assetsDir: './'
  }
});
