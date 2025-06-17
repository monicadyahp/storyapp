// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Hapus bagian rollupOptions.input.sw jika Anda memindahkan sw.js ke public
    // rollupOptions: {
    //   input: {
    //     main: './index.html',
    //     // sw: './src/sw.js', // Hapus baris ini
    //   },
    //   output: {
    //     entryFileNames: (chunkInfo) => {
    //       if (chunkInfo.name === 'sw') {
    //         return 'sw.js';
    //       }
    //       return 'assets/[name]-[hash].js';
    //     },
    //   },
    // },
  },
  server: {
    headers: {
      'Service-Worker-Allowed': '/',
    },
    // Hapus bagian rewrite khusus untuk sw.js jika Anda memindahkan sw.js ke public
    // rewrite: [
    //   {
    //     from: '/sw.js',
    //     to: '/src/sw.js',
    //   }
    // ],
  },
});