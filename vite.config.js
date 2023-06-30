import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react(),
        laravel([
            'resources/css/app.css',
            'resources/css/index.css',
            'resources/js/app.js',
        ])
    ],
    resolve: {
        alias: [{ find: "@", replacement: "/resources" },
            { find: "@C/", replacement: "resources/components" }
        ],
    },
});
