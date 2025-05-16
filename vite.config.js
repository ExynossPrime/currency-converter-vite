import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    server: {
        port: 8080,
        hot: true
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            }
        }
    }
});
