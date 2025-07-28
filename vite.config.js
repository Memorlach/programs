import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        cors: {
            origin: ["http://bloqueos-v2.mt"],
        },
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true,
            ignored: [
                '**/storage/**',
                '**/vendor/**',
                '**/node_modules/**'
            ]
        }
    },
    plugins: [
        laravel({
            input: [
                'resources/js/app.tsx',
                'resources/css/app.css'
            ], // Solo un punto de entrada
            refresh: true,
        }),
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
        tailwindcss(),
    ],
    define: {
        'process.env': process.env
    },
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom'],
    },
});