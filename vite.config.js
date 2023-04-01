import {defineConfig} from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, './index.ts'),
            name: 'VueCommonDirectives',
            formats: ['es'],
            fileName: (format) => `vue-common-directives.js`
        },
        outDir: "./dist/",
        emptyOutDir: true,
    }
});
